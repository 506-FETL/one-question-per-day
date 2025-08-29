import type { AsyncFunction, GeneratorFunction } from './types'

/**
 * 将生成器函数转换为异步函数。
 *
 * @param func - 一个生成器函数。
 * @returns 一个返回 Promise 的异步函数。
 * @throws TypeError 如果传入的参数不是生成器函数。
 */
export default function generatorToAsync<TReturn = unknown>(
  func: GeneratorFunction<TReturn>,
): AsyncFunction<TReturn> {
  if (typeof func !== 'function') {
    throw new TypeError(`传入的${func}必须是生成器函数`)
  }

  // 检查是否是生成器函数
  const testIterator = func()
  if (!testIterator || typeof testIterator.next !== 'function') {
    throw new TypeError(`传入的${func}必须是生成器函数`)
  }

  const isPromiseLike = (v: unknown): v is PromiseLike<unknown> => {
    if (v !== null && (typeof v === 'function' || typeof v === 'object')) {
      return typeof (v as Record<string, unknown>).then === 'function'
    }

    return false
  }

  return (): Promise<TReturn> =>
    new Promise<TReturn>((resolve, reject) => {
      const iterator = func()

      const step = (prev?: unknown): void => {
        try {
          const result
            = prev === undefined ? iterator.next() : iterator.next(prev)
          const { value, done } = result

          if (done) {
            resolve(value)
          }
          else if (isPromiseLike(value)) {
            value.then(
              (resolvedValue: unknown) => step(resolvedValue),
              (error: unknown) => reject(error),
            )
          }
          else {
            step(value)
          }
        }
        catch (error) {
          reject(error)
        }
      }

      step()
    })
}
