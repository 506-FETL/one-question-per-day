import { describe, it, expect } from 'vitest'
import compose from './compose'

describe('compose函数', () => {
  it('应该正确组合同步函数', async () => {
    const add = (x) => x + 1
    const multiply = (x) => x * 2
    const subtract = (x) => x - 3

    const composed = compose([add, multiply, subtract])
    const result = await composed(5)

    // (5 + 1) * 2 - 3 = 9
    expect(result).toBe(9)
  })

  it('应该正确将参数传递给第一个函数', async () => {
    const add = (x, y) => x + y
    const multiply = (x) => x * 2

    const composed = compose([add, multiply])
    const result = await composed(5, 3)

    // (5 + 3) * 2 = 16
    expect(result).toBe(16)
  })

  it('应该正确组合异步函数', async () => {
    const add = async (x) => x + 1
    const multiply = async (x) => x * 2

    const composed = compose([add, multiply])
    const result = await composed(5)

    // (5 + 1) * 2 = 12
    expect(result).toBe(12)
  })

  it('应该正确组合同步和异步函数', async () => {
    const add = (x) => x + 1
    const multiply = async (x) => x * 2
    const subtract = (x) => x - 3

    const composed = compose([add, multiply, subtract])
    const result = await composed(5)

    // (5 + 1) * 2 - 3 = 9
    expect(result).toBe(9)
  })

  it('应该处理多次调用时需要复制数组', async () => {
    const add = (x) => x + 1
    const multiply = (x) => x * 2

    const list = [add, multiply]
    const composed = compose([...list])
    const result1 = await composed(5)

    expect(result1).toBe(12)

    const composed2 = compose([...list])
    const result2 = await composed2(10)

    expect(result2).toBe(22)
  })

  it('应该处理单个函数的情况', async () => {
    const add = (x) => x + 1

    const composed = compose([add])
    const result = await composed(5)

    expect(result).toBe(6)
  })

  it('应该处理错误传播', async () => {
    const add = (x) => x + 1
    const error = () => {
      throw new Error('测试错误')
    }
    const multiply = (x) => x * 2

    const composed = compose([add, error, multiply])

    await expect(composed(5)).rejects.toThrow('测试错误')
  })
})
