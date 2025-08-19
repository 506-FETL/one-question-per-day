import type { Executor, Handler, OnFulfilled, OnRejected, PromiseState } from './types'

const PENDING: PromiseState = 'pending'
const FULFILLED: PromiseState = 'fulfilled'
const REJECTED: PromiseState = 'rejected'

export default class MyPromise<T = any> {
  #state: PromiseState = PENDING
  #value: T | any = void 0
  #handlers: Handler<T, any>[] = []

  constructor(executor: Executor<T>) {
    const resolve = (data: T | PromiseLike<T>) => {
      this.#changeState(FULFILLED, data)
    }
    const reject = (reason?: any) => {
      this.#changeState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    }
    catch (error) {
      reject(error)
    }
  }

  #changeState(state: PromiseState, data: T | any) {
    if (this.#state !== PENDING)
      return

    this.#state = state
    this.#value = data
    this.#run()
  }

  #run() {
    if (this.#state === PENDING)
      return

    while (this.#handlers.length) {
      const handler = this.#handlers.shift()
      if (!handler)
        continue

      const { onFulfilled, onRejected, resolve, reject } = handler

      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      }
      else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  #runOne<R>(
    callback: OnFulfilled<T, R> | OnRejected<R>,
    resolve: (value: R | PromiseLike<R>) => void,
    reject: (reason?: any) => void,
  ) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#value)
      }
      else {
        try {
          const data = callback(this.#value)
          if (this.isPromiseLike(data)) {
            (data as PromiseLike<R>).then(resolve, reject)
          }
          else {
            resolve(data as R)
          }
        }
        catch (err) {
          reject(err)
        }
      }
    })
  }

  #runMicroTask(func: () => void) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
    }
    else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const txtNode = document.createTextNode('1')
      ob.observe(txtNode, { characterData: true })
      txtNode.data = '2'
    }
    else {
      setTimeout(func, 0)
    }
  }

  isPromiseLike(value: any): value is PromiseLike<any> {
    if (
      value !== null
      && (typeof value === 'object' || typeof value === 'function')
    ) {
      return typeof value.then === 'function'
    }

    return false
  }

  then<R1 = T, R2 = never>(
    onFulfilled?: OnFulfilled<T, R1>,
    onRejected?: OnRejected<R2>,
  ): MyPromise<R1 | R2> {
    return new MyPromise<R1 | R2>((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }

  catch<R = never>(onRejected?: OnRejected<R>): MyPromise<T | R> {
    return this.then(void 0, onRejected)
  }

  finally(onFinally?: () => void): MyPromise<T> {
    return this.then(
      (data: T) => {
        onFinally?.()
        return data
      },
      (err: any) => {
        onFinally?.()
        throw err
      },
    )
  }

  static resolve<T>(value: T | PromiseLike<T>): MyPromise<T> {
    if (value instanceof MyPromise)
      return value

    let _resolve: ((value: T | PromiseLike<T>) => void) | undefined
    let _reject: ((reason?: any) => void) | undefined
    const p = new MyPromise<T>((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    if (p.isPromiseLike(value)) {
      value.then(_resolve!, _reject!)
    }
    else {
      _resolve!(value)
    }

    return p
  }

  static reject<T = never>(value?: any): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      reject(value)
    })
  }
}
