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
  const tasks = []
  tasks.push(() => logFn(`Hi, I'm ${name}.`))
  const api = {
    eat(food) {
      tasks.push(() => logFn(`Eat ${food}.`))
      return this
    },
    sleep(time) {
      tasks.push(() => logFn(`Wake up after ${time} seconds.`))
      return this
    },
    sleepFirst(time) {
      tasks.unshift(() => logFn(`Wake up after ${time} seconds.`))
      return this
    },
  }
  const runTasks = (tasks) => {
    let promise = Promise.resolve()
    tasks.forEach((task) => {
      promise = promise.then(task)
    })
  }
  setTimeout(() => {
    runTasks(tasks)
  }, 0)
  return api
}
