export default class MyPromise {
  #state = 'pending'
  #value = null
  #successHandlers = []
  #errorHandlers = []
  constructor(executor) {
    try {
      executor(this.resolve.bind(this), this.resolve.bind(this))
    } catch (error) {
      this.reject(error)
    }

  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const successHandler = (value) => {
        if (typeof onFulfilled !== 'function') {
          resolve(value);
          return;
        }
        try {
          // 成功的回调，也就是执行resolve之后的回调，或者是promise里面的执行函数是同步的就会直接执行
          const result = onFulfilled(value)
          /**
           *如果返回的是一个promise，那么then函数返回的promise状态要跟随回
           返回的promise的状态，比如回调函数返回的是一个promise，1秒钟之后resolve，那么then函数返回的函数最开始也应该是pending状态，链式调用下一个then里面鹅回调也是被注册到执行队列里面，直到1秒种之后resolve之后，then函数返回的promise也要resolve，然后就执行注册的方法。
           result.then(resolve, reject)这样写的逻辑就是把then函数返回的promise的resolve和reject注册成result的回调函数，这样当result这个promiseresolve之后就会执行then函数返回的promise的resolve然后就会链式执行后续的回调函数      
           */
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      const errorHandler = (reason) => {
        // 如果回调不是函数，实现错误透传
        if (typeof onRejected !== 'function') {
          reject(reason);
          return;
        }
        try {
          const result = onRejected(reason)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (this.#state === 'pending') {
        // 如果还在进行中，把回调存起来
        this.#successHandlers.push(successHandler);
        this.#errorHandlers.push(errorHandler);
      } else if (this.#state === 'fulfilled') {
        // 如果已经成功，异步执行成功回调
        queueMicrotask(() => successHandler(this.#value));
      } else if (this.#state === 'reject') {
        // 如果已经失败，异步执行失败回调
        queueMicrotask(() => errorHandler(this.#value));
      }
    })
  }
  resolve(value) {
    if (this.#state === 'pending') {
      this.#state = 'fulfilled'
      this.#value = value
      while (this.#successHandlers.length) {
        const func = this.#successHandlers.shift()
        func(value)
      }
    }
  }
  reject(error) {
    if (this.#state === 'pending') {
      this.#state = 'reject'
      this.#value = error
      while (this.#successHandlers.length) {
        const func = this.#errorHandlers.shift()
        func(error)
      }
    }
  }
  // 静态resolve方法，用于快速返回一个确定状态的MyPromise对象
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    } else if (value && typeof value === "object" && typeof value.then === "function") {
      return new Promise((resolve,reject)=>{
        value.then(resolve,reject)
      })
    } else {
      return new MyPromise((resolve) => {
        resolve(value)
      })
    }

  }
  static reject(error) {
    if (error instanceof MyPromise) {
      return error
    } else if (error && typeof value === "object" && typeof error.then === "function") {
      error.then(this.resolve, this.reject)
    } else {
      return new MyPromise((resolve, reject) => {
        reject(error)
      })
    }
  }
  catch(onRejected) {
    return this.then(onRejected, onRejected);
  }
  finally(callback) {
    // finally 需要返回一个新的 Promise
    return this.then(
      // 成功时执行 callback，并透传原值
      value => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      // 失败时执行 callback，并继续抛出错误
      reason => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }
}