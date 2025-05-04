/*global process */

const PENDING = 'pending' // 状态: 等待中
const FULFILLED = 'fulfilled' // 状态: 已完成
const REJECTED = 'rejected' // 状态: 已拒绝

export default class MyPromise {
  #state = PENDING // 初始状态为等待中
  #result = void 0 // 初始结果为 undefined
  #handlers = [] // 存储处理函数的数组

  constructor(executor) {
    const resolve = (data) => {
      // 成功时调用的函数
      this.#changeState(FULFILLED, data)
    }
    const reject = (reason) => {
      // 失败时调用的函数
      this.#changeState(REJECTED, reason)
    }

    try {
      // 执行传入的 executor 函数
      executor(resolve, reject)
    } catch (err) {
      // 如果执行函数中发生错误，直接调用 reject
      reject(err)
    }
  }

  #changeState(state, result) {
    // 改变状态和结果的私有方法
    if (this.#state !== PENDING) return // 如果状态已经改变，则返回

    this.#state = state // 改变状态
    this.#result = result // 设置结果
    this.#run() // 运行保存的处理函数
  }

  isPromiseLike(value) {
    // 检查是否是类 Promise 对象的方法
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      return typeof value.then === 'function'
    }

    return false
  }

  #runMicroTask(func) {
    // 运行微任务的私有方法
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func) // Node.js 环境中使用 process.nextTick
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func) // 浏览器环境中使用 MutationObserver
      const textNode = document.createTextNode('1')
      ob.observe(textNode, { characterData: true })
      textNode.data = '2'
    } else {
      setTimeout(func, 0) // 最后使用 setTimeout
    }
  }

  #runOne(callback, resolve, reject) {
    // 运行单个处理函数的私有方法
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result) // 如果回调不是函数，则直接根据状态调用 resolve 或 reject
        return
      } else {
        try {
          const data = callback(this.#result) // 调用回调函数并传入结果
          if (this.isPromiseLike(data)) {
            data.then(resolve, reject) // 如果返回值是类 Promise 对象，则调用其 then 方法
          } else {
            resolve(data) // 否则直接调用 resolve
          }
        } catch (err) {
          reject(err) // 如果回调函数中发生错误，调用 reject
        }
      }
    })
  }

  #run() {
    // 运行所有处理函数的私有方法
    if (this.#state === PENDING) return // 如果状态为等待中，直接返回

    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift() // 取出一个处理函数

      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject) // 如果状态为已完成，运行对应的成功处理函数
      } else {
        this.#runOne(onRejected, resolve, reject) // 如果状态为已拒绝，运行对应的失败处理函数
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 定义 then 方法
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      }) // 将处理函数添加到 handlers 数组中
      this.#run() // 尝试运行所有处理函数
    })
  }

  catch(onRejected) {
    // 定义 catch 方法
    return this.then(undefined, onRejected) // 只传入失败处理函数，成功处理函数传 undefined
  }

  finally(onFinally) {
    // 定义 finally 方法
    return this.then(
      (data) => {
        onFinally() // 执行成功后总执行的函数
        return data // 返回原始数据
      },
      (err) => {
        onFinally() // 执行失败后总执行的函数
        throw err // 抛出原始错误
      },
    )
  }

  static resolve(value) {
    // 定义静态 resolve 方法
    if (value instanceof MyPromise) return value // 如果传入值已经是一个 MyPromise 实例，直接返回

    // 创建一个新的 MyPromise 实例，并获取其 resolve 和 reject 函数，这里将里面的 resolve 和 reject 方法调用出来是为了后面能够根据传入不同的 value 值来决定怎么处理
    let _resolve, _reject
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    if (p.isPromiseLike(value)) {
      value.then(_resolve, _reject) // 如果传入值是类 Promise 对象，调用其 then 方法
    } else {
      _resolve(value) // 否则直接调用 resolve
    }
    return p // 返回新的 MyPromise 实例
  }

  static reject(reason) {
    // 定义静态 reject 方法
    return new MyPromise((resolve, reject) => {
      reject(reason) // 创建一个新的 MyPromise 实例，并立即调用 reject
    })
  }
}
