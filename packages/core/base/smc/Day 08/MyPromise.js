const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export default class MyPromise {
  #state = PENDING
  #result = void 0
  #handlers = []

  constructor(executor) {
    let sealed = false // 只允许第一次生效

    const resolve = (x) => {
      if (sealed)
        return
      sealed = true
      this.#resolvePromise(x)
    }

    const reject = (r) => {
      if (sealed)
        return
      sealed = true
      this.#changeState(REJECTED, r)
    }

    try {
      executor(resolve, reject)
    }
    catch (e) {
      reject(e)
    }
  }

  // ===== 内部工具 =====
  isPromiseLike(value) {
    return (
      value !== null
      && (typeof value === 'object' || typeof value === 'function')
      && typeof value.then === 'function'
    )
  }

  #runMicroTask(fn) {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(fn)
    }
    else if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(fn)
    }
    else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(fn)
      const text = document.createTextNode('1')
      ob.observe(text, { characterData: true })
      text.data = '2'
    }
    else {
      setTimeout(fn, 0)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING)
      return
    this.#state = state
    this.#result = result
    this.#run()
  }

  // A+ 2.3: [[Resolve]](promise, x)
  #resolvePromise(x) {
    if (this.#state !== PENDING)
      return
    if (x === this) {
      this.#changeState(REJECTED, new TypeError('Chaining cycle detected'))
      return
    }

    if (this.isPromiseLike(x)) {
      // 跟随 thenable
      try {
        x.then(
          y => this.#resolvePromise(y), // 递归展开
          r => this.#changeState(REJECTED, r),
        )
      }
      catch (e) {
        this.#changeState(REJECTED, e)
      }
      return
    }

    // 普通值
    this.#changeState(FULFILLED, x)
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        // 值透传/错透传
        if (this.#state === FULFILLED)
          resolve(this.#result)
        else reject(this.#result)
        return
      }
      try {
        const data = callback(this.#result)
        // 这里不直接展开，由子 promise 的 resolve 去执行 [[Resolve]]
        resolve(data)
      }
      catch (err) {
        reject(err)
      }
    })
  }

  #run() {
    if (this.#state === PENDING)
      return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      }
      else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  // ===== 对外 API =====
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(
      (v) => {
        if (typeof onFinally === 'function')
          onFinally()
        return v
      },
      (e) => {
        if (typeof onFinally === 'function')
          onFinally()
        throw e
      },
    )
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value)) // 交给内部 [[Resolve]] 展开
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
}
