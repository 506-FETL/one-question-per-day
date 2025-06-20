import { describe, expect, it } from 'vitest'
import Middleware from './middle_ware'

describe('04.29--default.处理同步Middleware', () => {
  it('应按顺序调用所有中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      calls.push('a')
      next()
    })
    mw.use((req, next) => {
      calls.push('b')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['a', 'b'])
  })

  it('应传递 req 对象给中间件', () => {
    const mw = new Middleware()
    const req = { foo: 1 }
    let receivedReq = null

    mw.use((r, next) => {
      receivedReq = r
      next()
    })

    mw.start(req)
    expect(receivedReq).toBe(req)
  })

  it('应处理错误并调用错误处理中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      calls.push('normal')
      next(new Error('fail'))
    })
    mw.use((err, req, next) => {
      calls.push('error')
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe('fail')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['normal', 'error'])
  })

  it('应支持多个错误处理中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      next(new Error('fail'))
    })
    mw.use((err, req, next) => {
      calls.push('error1')
      next(err)
    })
    mw.use((err, req, next) => {
      calls.push('error2')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['error1', 'error2'])
  })

  it('应在中间件抛出异常时进入错误处理中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      throw new Error('oops')
    })
    mw.use((err, req, next) => {
      calls.push('error')
      expect(err.message).toBe('oops')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['error'])
  })

  it('应忽略没有注册的错误处理中间件', () => {
    const mw = new Middleware()

    mw.use((req, next) => {
      next(new Error('fail'))
    })

    // 没有错误处理中间件，不应抛出异常
    expect(() => mw.start({})).not.toThrow()
  })

  it('应忽略没有注册的普通中间件', () => {
    const mw = new Middleware()
    // 没有普通中间件，不应抛出异常
    expect(() => mw.start({})).not.toThrow()
  })

  it('应支持在中间件内部多次调用 next', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      calls.push('a-start')
      next()
      calls.push('a-end')
    })

    mw.use((req, next) => {
      calls.push('b')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['a-start', 'b', 'a-end'])
  })

  it('应支持嵌套调用中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      calls.push('outer-start')
      next()
      calls.push('outer-end')
    })

    mw.use((req, next) => {
      calls.push('inner-start')
      next()
      calls.push('inner-end')
    })

    mw.use((req, next) => {
      calls.push('innermost')
      next()
    })

    mw.start({})
    expect(calls).toEqual([
      'outer-start',
      'inner-start',
      'innermost',
      'inner-end',
      'outer-end',
    ])
  })

  it('应在错误处理中间件抛出异常时继续捕获并传递给下一个错误处理中间件', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      next(new Error('initial-error'))
    })

    mw.use((err, req, next) => {
      calls.push('error-handler-1')
      throw new Error('error-in-handler')
    })

    mw.use((err, req, next) => {
      calls.push('error-handler-2')
      expect(err.message).toBe('error-in-handler')
      next()
    })

    mw.start({})
    expect(calls).toEqual(['error-handler-1', 'error-handler-2'])
  })

  it('应能正确处理错误处理中间件和普通中间件的交替执行', () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      calls.push('normal-1')
      next(new Error('error-1'))
    })

    mw.use((err, req, next) => {
      calls.push('error-handler-1')
      next() // 不再传递错误
    })

    mw.use((req, next) => {
      calls.push('normal-2')
      next()
    })

    mw.use((req, next) => {
      calls.push('normal-3')
      next(new Error('error-2'))
    })

    mw.use((err, req, next) => {
      calls.push('error-handler-2')
      next()
    })

    mw.start({})
    expect(calls).toEqual([
      'normal-1',
      'error-handler-1',
      'normal-2',
      'normal-3',
      'error-handler-2',
    ])
  })

  it('应能正确修改请求对象', () => {
    const mw = new Middleware()
    const req = { count: 0 }

    mw.use((req, next) => {
      req.count++
      next()
    })

    mw.use((req, next) => {
      req.count++
      next()
    })

    mw.use((req, next) => {
      req.count++
      next()
    })

    mw.start(req)
    expect(req.count).toBe(3)
  })
})

describe('04.29--default.处理异步MiddleWare', () => {
  it('应支持异步中间件链式调用', async () => {
    const mw = new Middleware()
    const calls = []

    mw.use(async (req, next) => {
      calls.push('first')
      await new Promise((resolve) => setTimeout(resolve, 10))
      next()
    })
    mw.use(async (req, next) => {
      calls.push('second')
      await new Promise((resolve) => setTimeout(resolve, 10))
      next()
    })

    // 为了结束链条，我们额外添加一个同步 middleware 来调用 Promise 的 resolve
    await new Promise((resolve) => {
      mw.use((req, next) => {
        resolve() // 链条结束时调用 resolve
      })
      mw.start({})
    })

    expect(calls).toEqual(['first', 'second'])
  })

  it('应支持异步错误处理中间件', async () => {
    const mw = new Middleware()
    const calls = []

    // 一个异步中间件在 10ms 后调用 next 传入错误
    mw.use((req, next) => {
      setTimeout(() => next(new Error('async error')), 10)
    })
    mw.use(async (err, req, next) => {
      calls.push('error')
      await new Promise((resolve) => setTimeout(resolve, 10))
      next()
    })

    await new Promise((resolve) => {
      // 添加结束 middleware
      mw.use((req, next) => {
        resolve()
      })
      mw.start({})
    })

    expect(calls).toEqual(['error'])
  })

  it('异步中间件抛出异常应进入错误处理中间件', async () => {
    const mw = new Middleware()
    const calls = []

    // 这只 async 中间件会直接抛异常
    mw.use(async (req, next) => {
      throw new Error('async throw')
    })
    mw.use((err, req, next) => {
      calls.push('caught')
      expect(err.message).toBe('async throw')
      next()
    })

    await new Promise((resolve) => {
      mw.use((req, next) => {
        resolve()
      })
      mw.start({})
    })

    expect(calls).toEqual(['caught'])
  })

  it('异步错误处理中间件抛出异常应传递给下一个错误处理中间件', async () => {
    const mw = new Middleware()
    const calls = []

    mw.use((req, next) => {
      next(new Error('err'))
    })

    mw.use(async (err, req, next) => {
      calls.push('first')
      // 异步错误处理中间件抛出异常
      throw new Error('second')
    })

    mw.use((err, req, next) => {
      calls.push('second')
      expect(err.message).toBe('second')
      next()
    })

    await new Promise((resolve) => {
      mw.use((req, next) => {
        resolve()
      })
      mw.start({})
    })

    expect(calls).toEqual(['first', 'second'])
  })

  it('异步中间件 next 多次调用应按顺序执行', async () => {
    const mw = new Middleware()
    const calls = []

    mw.use(async (req, next) => {
      calls.push('a1')
      await new Promise((resolve) => setTimeout(resolve, 5))
      next()
      calls.push('a2')
    })
    mw.use(async (req, next) => {
      calls.push('b')
      next()
    })

    await new Promise((resolve) => {
      mw.use((req, next) => {
        resolve()
      })
      mw.start({})
    })

    expect(calls).toEqual(['a1', 'b', 'a2'])
  })
})
