/*global process */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export default class MyPromise {
  #state = PENDING
  #value = void 0
  #handlers = []

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state, data) {
    if (this.#state !== PENDING) return

    this.#state = state
    this.#value = data
    this.#run()
  }

  #run() {
    if (this.#state === PENDING) return

    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()

      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }
  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#value)
        return
      } else {
        try {
          const data = callback(this.#value)
          if (this.isPromiseLike(data)) {
            data.then(resolve, reject)
          } else {
            resolve(data)
          }
        } catch (err) {
          reject(err)
        }
      }
    })
  }

  #runMicroTask(func) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
    } else if (MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const txtNode = document.createTextNode('1')
      ob.observe(txtNode, { characterData: true })
      txtNode.data = '2'
    } else {
      setTimeout(func, 0)
    }
  }

  isPromiseLike(value) {
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      return typeof value.then === 'function'
    }

    return false
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }

  catch(onRejected) {
    return this.then(void 0, onRejected)
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally()
        return data
      },
      (err) => {
        onFinally()
        throw err
      },
    )
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value

    let _resolve, _reject
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    if (p.isPromiseLike(value)) {
      value.then(_resolve, _reject)
    } else {
      _resolve(value)
    }

    return p
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }
}
