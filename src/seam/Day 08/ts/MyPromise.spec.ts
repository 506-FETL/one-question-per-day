import { describe, expect, it, suite, vi } from 'vitest'
import MyPromise from './MyPromise'

describe('myPromise', () => {
  suite('基本功能', () => {
    it('应该创建处于pending状态的promise', () => {
      const promise = new MyPromise(() => {})
      // 无法直接访问私有属性，所以只能通过行为测试状态
      let state = 'unknown'
      promise.then(
        () => {
          state = 'fulfilled'
        },
        () => {
          state = 'rejected'
        },
      )
      expect(state).toBe('unknown')
    })

    it('应该能够同步resolve', () => {
      const promise = new MyPromise((resolve) => {
        resolve('success')
      })
      return promise.then((value) => {
        expect(value).toBe('success')
      })
    })

    it('应该能够同步reject', () => {
      const promise = new MyPromise((_, reject) => {
        reject('error')
      })
      return promise.then(
        () => {
          throw new Error('不应该调用resolve')
        },
        (reason) => {
          expect(reason).toBe('error')
        },
      )
    })

    it('应该在构造函数执行出错时自动reject', () => {
      const error = new Error('constructor error')
      const promise = new MyPromise(() => {
        throw error
      })
      return promise.then(
        () => {
          throw new Error('不应该调用resolve')
        },
        (reason) => {
          expect(reason).toBe(error)
        },
      )
    })
  })

  suite('then方法', () => {
    it('应该支持链式调用then', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(value => value + 1)
        .then(value => value + 1)
        .then((value) => {
          expect(value).toBe(3)
        })
    })

    it('应该能处理then中返回的promise', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then((value) => {
          return new MyPromise((resolve) => {
            setTimeout(() => {
              resolve(value + 1)
            }, 10)
          })
        })
        .then((value) => {
          expect(value).toBe(2)
        })
    })

    it('应该正确处理多个then', () => {
      const p = new MyPromise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 10)
      })

      const onFulfilled1 = vi.fn()
      const onFulfilled2 = vi.fn()

      p.then(onFulfilled1)
      p.then(onFulfilled2)

      return new MyPromise<void>((resolve) => {
        setTimeout(() => {
          expect(onFulfilled1).toHaveBeenCalledWith(1)
          expect(onFulfilled2).toHaveBeenCalledWith(1)
          resolve()
        }, 20)
      })
    })

    it('当onFulfilled不是函数时应该透传值', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(undefined)
        .then((value) => {
          expect(value).toBe(1)
        })
    })
  })

  suite('catch方法', () => {
    it('应该捕获reject的错误', () => {
      return new MyPromise((_, reject) => {
        reject('error')
      }).catch((reason) => {
        expect(reason).toBe('error')
      })
    })

    it('应该捕获then中抛出的错误', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(() => {
          throw new Error('then error')
        })
        .catch((error) => {
          expect(error.message).toBe('then error')
        })
    })

    it('应该正确处理catch之后的then', () => {
      return new MyPromise((_, reject) => {
        reject('error')
      })
        .catch(() => 'recovered')
        .then((value) => {
          expect(value).toBe('recovered')
        })
    })
  })

  suite('finally方法', () => {
    it('应该在resolve后执行finally', () => {
      const onFinally = vi.fn()
      return new MyPromise((resolve) => {
        resolve('success')
      })
        .finally(onFinally)
        .then((value) => {
          expect(onFinally).toHaveBeenCalled()
          expect(value).toBe('success')
        })
    })

    it('应该在reject后执行finally', () => {
      const onFinally = vi.fn()
      return new MyPromise((_, reject) => {
        reject('error')
      })
        .finally(onFinally)
        .catch((reason) => {
          expect(onFinally).toHaveBeenCalled()
          expect(reason).toBe('error')
        })
    })
  })

  suite('静态resolve方法', () => {
    it('应该用普通值创建一个resolved的promise', () => {
      return MyPromise.resolve('value').then((value) => {
        expect(value).toBe('value')
      })
    })

    it('应该处理传入的MyPromise实例', () => {
      const original = new MyPromise((resolve) => {
        resolve('original')
      })
      const resolved = MyPromise.resolve(original)
      expect(resolved).toBe(original)
      return resolved.then((value) => {
        expect(value).toBe('original')
      })
    })

    it('应该处理传入的thenable对象', () => {
      const thenable = {
        then(resolve: CallableFunction) {
          resolve('thenable')
        },
      }
      return MyPromise.resolve(thenable).then((value) => {
        expect(value).toBe('thenable')
      })
    })
  })

  suite('静态reject方法', () => {
    it('应该创建一个rejected的promise', () => {
      return MyPromise.reject('reason').catch((reason) => {
        expect(reason).toBe('reason')
      })
    })
  })

  suite('异步行为', () => {
    it('应该异步执行then的回调', () => {
      const promise = new MyPromise((resolve) => {
        resolve('async')
      })

      let value = 'initial'
      promise.then((result) => {
        value = result
      })

      expect(value).toBe('initial') // 期望值仍然是初始值

      return new MyPromise<void>((resolve) => {
        setTimeout(() => {
          expect(value).toBe('async') // 期望值已经在微任务中被修改
          resolve()
        }, 0)
      })
    })

    it('应该按照Promise A+规范的顺序执行', () => {
      const order: string[] = []

      new MyPromise<void>((resolve) => {
        order.push('promise')
        resolve()
      })
        .then(() => {
          order.push('then1')
          return new MyPromise<void>((resolve) => {
            order.push('inner promise')
            resolve()
          }).then(() => {
            order.push('inner then')
          })
        })
        .then(() => {
          order.push('then2')
        })

      order.push('sync')

      return new MyPromise<void>((resolve) => {
        setTimeout(() => {
          expect(order).toEqual([
            'promise',
            'sync',
            'then1',
            'inner promise',
            'inner then',
            'then2',
          ])
          resolve()
        }, 50)
      })
    })
  })

  suite('错误处理', () => {
    it('应该处理then中的回调错误', () => {
      return new MyPromise<void>((resolve) => {
        resolve()
      })
        .then(() => {
          throw new Error('error in then')
        })
        .catch((err) => {
          expect(err.message).toBe('error in then')
        })
    })

    it('应该处理catch中的回调错误', () => {
      return new MyPromise((_, reject) => {
        reject('original error')
      })
        .catch(() => {
          throw new Error('error in catch')
        })
        .catch((err) => {
          expect(err.message).toBe('error in catch')
        })
    })

    it('应该处理finally中的回调错误', () => {
      return new MyPromise((resolve) => {
        resolve('value')
      })
        .finally(() => {
          throw new Error('error in finally')
        })
        .catch((err) => {
          expect(err.message).toBe('error in finally')
        })
    })
  })
})
