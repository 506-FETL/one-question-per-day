import type { AsyncFunction, GeneratorFunction } from './types'
import { describe, expect, it } from 'vitest'
import generatorToAsync from './GeneratorToAsync'

describe('04.17--default.将生成器函数转换成异步函数', () => {
  it('应将生成器函数转换为异步函数', async () => {
    const generatorFunction: GeneratorFunction<number> = function* () {
      const value1 = yield Promise.resolve(1)
      const value2 = yield Promise.resolve((value1 as number) + 1)
      return (value2 as number) + 1
    }

    const asyncFunction: AsyncFunction<number>
      = generatorToAsync(generatorFunction)
    const result = await asyncFunction()
    expect(result).toBe(3)
  })

  it('如果输入不是一个生成器函数,应抛出 TypeError', () => {
    const invalidFunc = () => {}
    expect(() =>
      generatorToAsync(invalidFunc as unknown as GeneratorFunction),
    ).toThrow(TypeError)
    expect(() =>
      generatorToAsync(null as unknown as GeneratorFunction),
    ).toThrow(TypeError)
    expect(() => generatorToAsync(123 as unknown as GeneratorFunction)).toThrow(
      TypeError,
    )
  })

  it('应处理生成器函数中的同步值', async () => {
    const generatorFunction: GeneratorFunction<number> = function* () {
      const value1 = yield 1
      const value2 = yield (value1 as number) + 1
      return (value2 as number) + 1
    }

    const asyncFunction: AsyncFunction<number>
      = generatorToAsync(generatorFunction)
    const result = await asyncFunction()
    expect(result).toBe(3)
  })

  it('如果返回的Promise被reject,应返回reject的报错值', async () => {
    const generatorFunction: GeneratorFunction<void> = function* () {
      yield Promise.reject(new Error('Test error'))
    }

    const asyncFunction: AsyncFunction<void>
      = generatorToAsync(generatorFunction)
    await expect(asyncFunction()).rejects.toThrow('Test error')
  })

  it('如果内部抛出错误，应直接reject', async () => {
    const generatorFunction: GeneratorFunction<void> = function* () {
      yield 2
      throw new Error('error')
    }

    const asyncFunction: AsyncFunction<void>
      = generatorToAsync(generatorFunction)
    await expect(asyncFunction()).rejects.toThrow('error')
  })
})
