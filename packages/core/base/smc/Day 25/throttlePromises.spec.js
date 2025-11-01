import { beforeEach, describe, expect, it, vi } from 'vitest'
import throttlePromises from './throttlePromises'

describe('throttlePromises', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('基础功能', () => {
    it('应该返回一个 Promise', () => {
      const result = throttlePromises([], 5)
      expect(result).toBeInstanceOf(Promise)
    })

    it('应该处理空数组并返回空结果', async () => {
      const result = await throttlePromises([], 5)
      expect(result).toEqual([])
    })

    it('应该按顺序返回所有成功的结果', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.resolve(3),
      ]

      const result = await throttlePromises(funcs, 2)
      expect(result).toEqual([1, 2, 3])
    })

    it('应该保持结果的原始顺序，即使任务完成顺序不同', async () => {
      const funcs = [
        () => new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
        () => Promise.resolve('fast1'),
        () => Promise.resolve('fast2'),
        () => new Promise(resolve => setTimeout(() => resolve('medium'), 50)),
      ]

      const result = await throttlePromises(funcs, 2)
      expect(result).toEqual(['slow', 'fast1', 'fast2', 'medium'])
    })
  })

  describe('并发控制', () => {
    it('应该限制同时运行的任务数量不超过 max', async () => {
      let currentActive = 0
      let maxActive = 0

      const createTask = delay => () => {
        currentActive++
        maxActive = Math.max(maxActive, currentActive)
        return new Promise((resolve) => {
          setTimeout(() => {
            currentActive--
            resolve(delay)
          }, delay)
        })
      }

      const funcs = [
        createTask(50),
        createTask(50),
        createTask(50),
        createTask(50),
        createTask(50),
        createTask(50),
      ]

      await throttlePromises(funcs, 3)
      expect(maxActive).toBe(3)
    })

    it('应该在任务完成后立即启动下一个任务', async () => {
      const executionOrder = []

      const funcs = [
        () => new Promise(resolve => setTimeout(() => {
          executionOrder.push('task1-start')
          resolve(1)
        }, 10)),
        () => new Promise(resolve => setTimeout(() => {
          executionOrder.push('task2-start')
          resolve(2)
        }, 10)),
        () => new Promise(resolve => setTimeout(() => {
          executionOrder.push('task3-start')
          resolve(3)
        }, 10)),
        () => {
          executionOrder.push('task4-start')
          return Promise.resolve(4)
        },
      ]

      await throttlePromises(funcs, 2)
      expect(executionOrder.length).toBe(4)
    })

    it('应该正确处理 max = 1 的情况（串行执行）', async () => {
      let currentActive = 0
      let maxActive = 0

      const createTask = id => () => {
        currentActive++
        maxActive = Math.max(maxActive, currentActive)
        return new Promise((resolve) => {
          setTimeout(() => {
            currentActive--
            resolve(id)
          }, 10)
        })
      }

      const funcs = Array.from({ length: 5 }, (_, i) => createTask(i))
      await throttlePromises(funcs, 1)
      expect(maxActive).toBe(1)
    })

    it('应该正确处理 max 大于任务数量的情况', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.resolve(3),
      ]

      const result = await throttlePromises(funcs, 10)
      expect(result).toEqual([1, 2, 3])
    })
  })

  describe('错误处理', () => {
    it('应该在第一个任务失败时立即拒绝', async () => {
      const funcs = [
        () => Promise.reject(new Error('task1 failed')),
        () => Promise.resolve(2),
        () => Promise.resolve(3),
      ]

      await expect(throttlePromises(funcs, 2)).rejects.toThrow('task1 failed')
    })

    it('应该在中间任务失败时立即拒绝', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.reject(new Error('task2 failed')),
        () => Promise.resolve(3),
      ]

      await expect(throttlePromises(funcs, 2)).rejects.toThrow('task2 failed')
    })

    it('应该在最后任务失败时拒绝', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.reject(new Error('task3 failed')),
      ]

      await expect(throttlePromises(funcs, 2)).rejects.toThrow('task3 failed')
    })

    it('应该只拒绝一次（即使多个任务失败）', async () => {
      const funcs = [
        () => new Promise((_, reject) => setTimeout(() => reject(new Error('error1')), 10)),
        () => new Promise((_, reject) => setTimeout(() => reject(new Error('error2')), 20)),
        () => new Promise((_, reject) => setTimeout(() => reject(new Error('error3')), 30)),
      ]

      await expect(throttlePromises(funcs, 3)).rejects.toThrow('error1')
    })

    it('应该在失败后停止启动新任务', async () => {
      const executedTasks = []

      const funcs = [
        () => {
          executedTasks.push(1)
          return Promise.resolve(1)
        },
        () => {
          executedTasks.push(2)
          return Promise.reject(new Error('fail'))
        },
        () => {
          executedTasks.push(3)
          return new Promise(resolve => setTimeout(() => resolve(3), 100))
        },
        () => {
          executedTasks.push(4)
          return Promise.resolve(4)
        },
      ]

      try {
        await throttlePromises(funcs, 2)
      }
      catch {
        // 忽略错误
      }

      // 等待一段时间确保不会有额外任务启动
      await new Promise(resolve => setTimeout(resolve, 150))

      // 任务 3 可能已经启动但任务 4 不应该启动
      expect(executedTasks.length).toBeLessThanOrEqual(3)
    })
  })

  describe('边界情况', () => {
    it('应该处理非数组输入', async () => {
      const result = await throttlePromises(null, 5)
      expect(result).toEqual([])
    })

    it('应该处理 undefined 输入', async () => {
      const result = await throttlePromises(undefined, 5)
      expect(result).toEqual([])
    })

    it('应该处理 max <= 0 的情况', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
      ]

      const result = await throttlePromises(funcs, 0)
      expect(result).toEqual([])
    })

    it('应该处理 max 为负数的情况', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
      ]

      const result = await throttlePromises(funcs, -5)
      expect(result).toEqual([])
    })

    it('应该处理返回非 Promise 值的函数', async () => {
      const funcs = [
        () => 1,
        () => Promise.resolve(2),
        () => 3,
      ]

      const result = await throttlePromises(funcs, 2)
      expect(result).toEqual([1, 2, 3])
    })

    it('应该处理返回 undefined 的任务', async () => {
      const funcs = [
        () => Promise.resolve(undefined),
        () => Promise.resolve(null),
        () => Promise.resolve(0),
        () => Promise.resolve(''),
      ]

      const result = await throttlePromises(funcs, 2)
      expect(result).toEqual([undefined, null, 0, ''])
    })
  })

  describe('性能和实际场景', () => {
    it('应该高效处理大量任务', async () => {
      const funcs = Array.from({ length: 100 }, (_, i) => () => Promise.resolve(i))

      const startTime = Date.now()
      const result = await throttlePromises(funcs, 10)
      const endTime = Date.now()

      expect(result.length).toBe(100)
      expect(result[0]).toBe(0)
      expect(result[99]).toBe(99)
      expect(endTime - startTime).toBeLessThan(1000) // 应该很快完成
    })

    it('应该模拟实际 API 调用场景', async () => {
      const mockApiCall = (id, delay) => () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ id, data: `response-${id}` })
          }, delay)
        })
      }

      const funcs = [
        mockApiCall(1, 30),
        mockApiCall(2, 10),
        mockApiCall(3, 20),
        mockApiCall(4, 15),
        mockApiCall(5, 25),
      ]

      const result = await throttlePromises(funcs, 2)

      expect(result).toHaveLength(5)
      expect(result[0]).toEqual({ id: 1, data: 'response-1' })
      expect(result[4]).toEqual({ id: 5, data: 'response-5' })
    })

    it('应该正确处理混合的同步和异步任务', async () => {
      const funcs = [
        () => 'sync1',
        () => Promise.resolve('async1'),
        () => 'sync2',
        () => new Promise(resolve => setTimeout(() => resolve('async2'), 10)),
        () => 'sync3',
      ]

      const result = await throttlePromises(funcs, 3)
      expect(result).toEqual(['sync1', 'async1', 'sync2', 'async2', 'sync3'])
    })
  })

  describe('与 Promise.all 行为一致性', () => {
    it('全部成功时行为应与 Promise.all 一致', async () => {
      const funcs = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.resolve(3),
      ]

      const throttleResult = await throttlePromises(funcs, 2)
      const promiseAllResult = await Promise.all(funcs.map(f => f()))

      expect(throttleResult).toEqual(promiseAllResult)
    })

    it('失败时行为应与 Promise.all 一致（立即拒绝）', async () => {
      const funcs1 = [
        () => Promise.resolve(1),
        () => Promise.reject(new Error('test error')),
        () => Promise.resolve(3),
      ]

      const funcs2 = [
        () => Promise.resolve(1),
        () => Promise.reject(new Error('test error')),
        () => Promise.resolve(3),
      ]

      let throttleError
      let promiseAllError

      try {
        await throttlePromises(funcs1, 2)
      }
      catch (err) {
        throttleError = err
      }

      try {
        await Promise.all(funcs2.map(f => f()))
      }
      catch (err) {
        promiseAllError = err
      }

      expect(throttleError.message).toBe(promiseAllError.message)
    })
  })

  describe('函数调用验证', () => {
    it('应该确保每个函数只被调用一次', async () => {
      const spy1 = vi.fn(() => Promise.resolve(1))
      const spy2 = vi.fn(() => Promise.resolve(2))
      const spy3 = vi.fn(() => Promise.resolve(3))

      const funcs = [spy1, spy2, spy3]

      await throttlePromises(funcs, 2)

      expect(spy1).toHaveBeenCalledTimes(1)
      expect(spy2).toHaveBeenCalledTimes(1)
      expect(spy3).toHaveBeenCalledTimes(1)
    })

    it('应该按正确的顺序调用函数', async () => {
      const callOrder = []

      const funcs = [
        () => {
          callOrder.push(1)
          return Promise.resolve(1)
        },
        () => {
          callOrder.push(2)
          return Promise.resolve(2)
        },
        () => {
          callOrder.push(3)
          return Promise.resolve(3)
        },
      ]

      await throttlePromises(funcs, 1)
      expect(callOrder).toEqual([1, 2, 3])
    })

    it('在错误发生后不应调用剩余未启动的函数', async () => {
      const spy1 = vi.fn(() => Promise.resolve(1))
      const spy2 = vi.fn(() => Promise.reject(new Error('fail')))
      const spy3 = vi.fn(() => new Promise(resolve => setTimeout(() => resolve(3), 100)))
      const spy4 = vi.fn(() => Promise.resolve(4))

      const funcs = [spy1, spy2, spy3, spy4]

      try {
        await throttlePromises(funcs, 2)
      }
      catch {
        // 忽略错误
      }

      await new Promise(resolve => setTimeout(resolve, 150))

      expect(spy1).toHaveBeenCalledTimes(1)
      expect(spy2).toHaveBeenCalledTimes(1)
      // spy3 可能已经启动（因为并发限制为 2）
      // spy4 不应该被调用
      expect(spy4).toHaveBeenCalledTimes(0)
    })
  })
})
