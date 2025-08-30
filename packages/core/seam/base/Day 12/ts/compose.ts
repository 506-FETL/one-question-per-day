/**
 * 组合多个函数，返回一个新的函数，按从右到左的顺序依次执行这些函数，并支持异步操作。
 *
 * @param  fns - 要组合的函数数组。每个函数接收上一个函数的返回值作为参数，可以返回 Promise 或普通值。
 * @returns  返回一个新的函数，接收任意参数，依次执行组合的函数，返回最终的 Promise。
 */
export default function compose(fns: ((...args: any[]) => void)[]) {
  const init = fns.shift()

  return function (this: any, ...args: any[]) {
    return fns.reduce(
      async (acc, cur) => {
        const result = await acc
        return cur.call(this, result)
      },
      Promise.resolve(init!.apply(null, args)),
    )
  }
}
