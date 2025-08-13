import type { GeneratorToAsyncFunction } from './types'

/**
 * 将生成器函数转换为异步函数。
 *
 * @param func - 一个生成器函数。
 * @returns 一个返回 Promise 的异步函数。
 * @throws TypeError 如果传入的参数不是生成器函数。
 */
const generatorToAsync: GeneratorToAsyncFunction = (func) => {
  // TODO: 实现生成器转异步函数的逻辑
  return () => Promise.resolve(undefined as never)
}

export default generatorToAsync
