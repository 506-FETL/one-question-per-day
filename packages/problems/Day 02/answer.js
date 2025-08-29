/**
 * 将生成器函数转换为异步函数。
 *
 * @param {() => Generator<any, any, any>} func - 一个生成器函数。
 * @returns {Function} 一个返回 Promise 的异步函数。
 * @throws {TypeError} 如果传入的参数不是生成器函数。
 */
export default function generatorToAsync(func) {
  if (typeof func !== 'function' || !('next' in func())) {
    throw new TypeError(`传入的${func}必须是生成器函数`)
  }

  const iterator = func()
  const isPromiseLike = (v) => {
    if (v !== null && (typeof v === 'function' || typeof v === 'object')) {
      return typeof v.then === 'function'
    }

    return false
  }

  return () =>
    new Promise((resolve, reject) => {
      function step(prev) {
        try {
          const { value, done } = iterator.next(prev)

          if (done) {
            resolve(value)
          }
          else if (isPromiseLike(value)) {
            value.then(step, reject)
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
