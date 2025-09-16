// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness} 可链式调用
 */
export default function LazyMan(name, logFn) {
  const tailCache = []
  const headCache = []

  tailCache.push(() => logFn(`Hi, I'm ${name}.`))

  queueMicrotask(run)

  async function run() {
    const task = [...headCache, ...tailCache]
    for (const t of task) {
      await t()
    }
  }

  async function _sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        logFn(`Wake up after ${ms} ${ms > 1 ? 'seconds' : 'second'}.`)
        resolve()
      }, ms * 1000)
    })
  }

  return {
    sleep(sec) {
      tailCache.push(() => _sleep(sec))
      return this
    },
    eat(food) {
      tailCache.push(() => logFn(`Eat ${food}.`))
      return this
    },
    sleepFirst(time) {
      headCache.push(() => _sleep(time))
      return this
    },
  }
}
