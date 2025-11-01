/**
 * @param {(() => Promise<any>)[]} funcs
 * @param {number} max
 * @return {Promise}
 */
export default function throttlePromises(funcs, max = 5) {
  if (!Array.isArray(funcs) || max <= 0)
    return Promise.resolve([])

  const total = funcs.length
  if (total === 0)
    return Promise.resolve([])

  const results = []
  let next = 0 // 下一个要启动的任务索引
  let active = 0 // 正在进行的任务数
  let finished = 0 // 已完成的任务数
  let settled = false

  return new Promise((resolve, reject) => {
    const launch = () => {
      // 如果已经启动完所有任务，且没有进行中的，收尾
      if (finished === total) {
        if (!settled) {
          settled = true
          resolve(results)
        }
        return
      }

      // 尽量补满并发槽位
      while (active < max && next < total) {
        const idx = next++
        active++

        // 启动任务
        Promise.resolve()
          .then(() => funcs[idx]()) // 支持 fp 可能不是已启动的 Promise，而是函数
          .then((val) => {
            results[idx] = val
          })
          .catch((err) => {
            if (!settled) {
              settled = true
              reject(err) // 首错即抛
            }
          })
          .finally(() => {
            active--
            finished++
            if (!settled)
              launch() // 推进后续任务
          })
      }
    }

    launch()
  })
}
