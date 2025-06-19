const PENDING = 'pending' // 状态: 等待中
const FULFILLED = 'fulfilled' // 状态: 已完成
const REJECTED = 'rejected' // 状态: 已拒绝

export default class MyPromise {
  resolveList = []
  rejectList = []
  result = null
  cbIndex = 0
  finallyCb = () => {}
  constructor(extractor) {
    this.state = PENDING
    const resolve = (result) => {
      queueMicrotask(() => {
        this.resolveList.forEach((cb) => {
          cb && cb(result)
        })
        this.result = result
        this.changeState(FULFILLED)
      })
    }

    const reject = (reason) => {
      queueMicrotask(() => {
        this.rejectList.forEach((cb) => {
          cb && cb(reason)
        })
        this.result = reason

        this.changeState(REJECTED)
      })
    }
    try {
      extractor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  static resolve(res) {
    if (isPromiseLike(res)) {
      return res
    }
    return new MyPromise((resolve) => {
      resolve(res)
    })
  }
  static reject(res) {
    return new MyPromise((_, reject) => {
      reject(res)
    })
  }
  changeState(state) {
    if (this.state === PENDING) {
      this.state = state
      this.finallyCb()
    } else {
      throw new Error('状态已经确定,不能进行更改')
    }
  }

  catch(errorCb) {
    return this.then(void 0, errorCb)
  }
  then(resolveCb, rejectCb) {
    const cbHandler = (cb, resolve, reject) => {
      return (res) => {
        try {
          if (typeof cb !== 'function') {
            resolve(res)
          } else {
            res = cb(res)
            if (isPromiseLike(res)) {
              res.then(
                (res) => {
                  resolve(res)
                },
                (res) => {
                  reject(res)
                },
              )
            } else {
              resolve(res)
            }
          }
        } catch (error) {
          reject(error)
        }
      }
    }
    return new MyPromise((resolve, reject) => {
      this.resolveList.push(cbHandler(resolveCb, resolve, reject))
      this.rejectList.push(cbHandler(rejectCb, resolve, reject))
    })
  }
  finally(cb) {
    return this.then(
      (result) => {
        cb()
        return result
      },
      (reason) => {
        cb()
        throw reason
      },
    )
  }
}
const isPromiseLike = (value) => {
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    return typeof value.then === 'function'
  }

  return false
}
