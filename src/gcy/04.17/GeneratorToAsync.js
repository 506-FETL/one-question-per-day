/**
 * 将生成器函数转换为异步函数。
 *
 * @param {() => Generator<any, any, any>} func - 一个生成器函数。
 * @returns {Function} 一个返回 Promise 的异步函数。
 * @throws {TypeError} 如果传入的参数不是生成器函数。
 */
export default function generatorToAsync(func) {
  if (
    typeof func !== 'function' ||
    typeof func.prototype?.next !== 'function' ||
    typeof func.prototype?.throw !== 'function'
  ) {
    throw new TypeError('Input must be a generator function')
  }
  function ispromise(val) {
    if (typeof val === 'object' && val !== null && typeof val.then === 'function')
      return true
    else {
      return false
    }
  }
  return async function (...args) {
    let result
    let gen = func(...args)
    while (true) {
      try {
        const { value, done } = result ? gen.next(result) : gen.next()
        if (done) return value
        result = ispromise(value) ? await value : value
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
