import { describe, expect, it, suite, vi } from 'vitest'
import MyPromise from './MyPromise'

describe('myPromise', () => {
  suite('基本功能', () => {
    it('应该创建处于pending状态的promise', () => {
      const promise = new MyPromise(() => {})
      let state = 'unknown'
      promise.then(
        () => { state = 'fulfilled' },
        () => { state = 'rejected' },
      )
      expect(state).toBe('unknown')
    })

    it('应该能够同步resolve', async () => {
      const promise = new MyPromise((resolve) => {
        resolve('success')
      })
      const value = await promise
      expect(value).toBe('success')
    })

    it('应该能够同步reject', async () => {
      const promise = new MyPromise((_, reject) => {
        reject('error')
      })
      try {
        await promise
        throw new Error('不应该调用resolve')
      }
      catch (reason) {
        expect(reason).toBe('error')
      }
    })

    it('应该在构造函数执行出错时自动reject', async () => {
      const error = new Error('constructor error')
      const promise = new MyPromise(() => {
        throw error
      })
      try {
        await promise
        throw new Error('不应该调用resolve')
      }
      catch (reason) {
        expect(reason).toBe(error)
      }
    })
  })

  suite('then方法', () => {
    it('应该支持链式调用then', async () => {
      const value = await new MyPromise(resolve => resolve(1))
        .then(v => v + 1)
        .then(v => v + 1)
      expect(value).toBe(3)
    })

    it('应该能处理then中返回的promise', async () => {
      const value = await new MyPromise(resolve => resolve(1))
        .then(v => new MyPromise(resolve => setTimeout(() => resolve(v + 1), 10)))
      expect(value).toBe(2)
    })

    it('应该正确处理多个then', async () => {
      const p = new MyPromise((resolve) => {
        setTimeout(() => resolve(1), 10)
      })

      const onFulfilled1 = vi.fn()
      const onFulfilled2 = vi.fn()

      await p.then(onFulfilled1)
      await p.then(onFulfilled2)

      expect(onFulfilled1).toHaveBeenCalledWith(1)
      expect(onFulfilled2).toHaveBeenCalledWith(1)
    })

    it('当onFulfilled不是函数时应该透传值', async () => {
      const value = await new MyPromise(resolve => resolve(1)).then(undefined)
      expect(value).toBe(1)
    })

    it('resolve的值为promiseLike形式的时候应该吸收其状态', async () => {
      const rp = new MyPromise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 0)
      })
      const pl = {
        then(onFulfilled) {
          onFulfilled(1)
        },
      }

      const mp = new MyPromise((resolve) => {
        resolve(rp)
        resolve(2)
      })
      const mpl = new MyPromise((resolve) => {
        resolve(pl)
      })

      const onFulfilled1 = vi.fn()
      const onFulfilled2 = vi.fn()

      await mp.then(onFulfilled1)
      await mpl.then(onFulfilled2)

      expect(onFulfilled1).toHaveBeenCalledWith(1)
      expect(onFulfilled1).toHaveBeenCalledWith(1)
    })
  })

  suite('catch方法', () => {
    it('应该捕获reject的错误', async () => {
      try {
        await new MyPromise((_, reject) => reject('error'))
      }
      catch (reason) {
        expect(reason).toBe('error')
      }
    })

    it('应该捕获then中抛出的错误', async () => {
      try {
        await new MyPromise(resolve => resolve(1)).then(() => {
          throw new Error('then error')
        })
      }
      catch (error) {
        expect(error.message).toBe('then error')
      }
    })

    it('应该正确处理catch之后的then', async () => {
      const value = await new MyPromise((_, reject) => reject('error'))
        .catch(() => 'recovered')
      expect(value).toBe('recovered')
    })
  })

  suite('finally方法', () => {
    it('应该在resolve后执行finally', async () => {
      const onFinally = vi.fn()
      const value = await new MyPromise(resolve => resolve('success')).finally(onFinally)
      expect(onFinally).toHaveBeenCalled()
      expect(value).toBe('success')
    })

    it('应该在reject后执行finally', async () => {
      const onFinally = vi.fn()
      try {
        await new MyPromise((_, reject) => reject('error')).finally(onFinally)
      }
      catch (reason) {
        expect(onFinally).toHaveBeenCalled()
        expect(reason).toBe('error')
      }
    })
  })

  suite('静态resolve方法', () => {
    it('应该用普通值创建一个resolved的promise', async () => {
      const value = await MyPromise.resolve('value')
      expect(value).toBe('value')
    })

    it('应该处理传入的MyPromise实例', async () => {
      const original = new MyPromise(resolve => resolve('original'))
      const resolved = MyPromise.resolve(original)
      const value = await resolved
      expect(value).toBe('original')
    })

    it('应该处理传入的thenable对象', async () => {
      const thenable = { then(resolve) {
        resolve('thenable')
      } }
      const value = await MyPromise.resolve(thenable)
      expect(value).toBe('thenable')
    })
  })

  suite('静态reject方法', () => {
    it('应该创建一个rejected的promise', async () => {
      try {
        await MyPromise.reject('reason')
      }
      catch (reason) {
        expect(reason).toBe('reason')
      }
    })
  })

  suite('异步行为', () => {
    it('应该异步执行then的回调', async () => {
      const promise = new MyPromise(resolve => resolve('async'))
      let value = 'initial'
      promise.then((result) => {
        value = result
      })

      expect(value).toBe('initial')
      await new Promise(r => setTimeout(r, 0))
      expect(value).toBe('async')
    })

    it('应该按照Promise A+规范的顺序执行', async () => {
      const order = []

      new MyPromise((resolve) => {
        order.push('promise')
        resolve()
      })
        .then(() => {
          order.push('then1')
          return new MyPromise((resolve) => {
            order.push('inner promise')
            resolve()
          }).then(() => {
            order.push('inner then')
          })
        })
        .then(() => { order.push('then2') })

      order.push('sync')

      await new Promise(r => setTimeout(r, 50))
      expect(order).toEqual([
        'promise',
        'sync',
        'then1',
        'inner promise',
        'inner then',
        'then2',
      ])
    })
  })

  suite('错误处理', () => {
    it('应该处理then中的回调错误', async () => {
      try {
        await new MyPromise(resolve => resolve()).then(() => {
          throw new Error('error in then')
        })
      }
      catch (err) {
        expect(err.message).toBe('error in then')
      }
    })

    it('应该处理catch中的回调错误', async () => {
      try {
        await new MyPromise((_, reject) => reject('original error'))
          .catch(() => { throw new Error('error in catch') })
      }
      catch (err) {
        expect(err.message).toBe('error in catch')
      }
    })

    it('应该处理finally中的回调错误', async () => {
      try {
        await new MyPromise(resolve => resolve('value')).finally(() => {
          throw new Error('error in finally')
        })
      }
      catch (err) {
        expect(err.message).toBe('error in finally')
      }
    })
  })
})
