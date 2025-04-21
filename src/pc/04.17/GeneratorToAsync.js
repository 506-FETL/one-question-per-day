/**
 * 将生成器函数转换为异步函数。
 *
 * @param {() => Generator<any, any, any>} func - 一个生成器函数。
 * @returns {Function} 一个返回 Promise 的异步函数。
 * @throws {TypeError} 如果传入的参数不是生成器函数。
 */
/*
在 JavaScript 中，生成器函数可以通过 `yield` 暂停执行，并在后续调用 `next` 方法时继续执行。现在，请你实现一个函数 `generatorToAsync`，它可以将一个生成器函数转换为一个异步函数，使得生成器函数中的 `yield` 可以自动处理异步操作（如 `Promise`）。

具体要求如下：

1. 输入是一个生成器函数 `func`。
2. 输出是一个异步函数，调用该函数时会自动执行生成器函数，并依次处理 `yield` 返回的值。
3. 如果 `yield` 返回的是一个 `Promise`，需要等待其完成后再继续执行生成器。
4. 如果 `yield` 返回的是普通值，则直接继续执行生成器。
5. 如果生成器函数执行过程中抛出错误，异步函数需要返回一个被拒绝的 `Promise`。

*/

export default function generatorToAsync(func) {
  if (typeof func !== 'function' || !('next' in func())) {
    throw new TypeError(`传入的${func}必须是生成器函数`)
  }
  return function () {
    const gen = func.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function handleFunction(asyncValue) {
        try {
          let next = gen.next(asyncValue)
          let { value, done } = next
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(
              (value) => handleFunction(value),
              (error) => {
                reject(error)
              }
            )
          }
        } catch (error) {
          reject(error)
        }
      }
      handleFunction()
    })
  }
}
