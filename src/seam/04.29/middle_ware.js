export default class Middleware {
  cbHandlers = []
  errHandlers = []

  use(func) {
    if (func.length === 2) this.cbHandlers.push(func)
    if (func.length === 3) this.errHandlers.push(func)
  }

  start(req) {
    let idx = 0,
      errIdx = 0
    const that = this

    function next(nextErr) {
      const args = [req, next]
      let func = null

      if (nextErr) {
        func = that.errHandlers[errIdx++]
        args.unshift(nextErr)
      } else {
        func = that.cbHandlers[idx++]
      }
      try {
        func && Promise.resolve(func(...args)).catch((error) => next(error))
      } catch (error) {
        next(error)
      }
    }

    next()
  }
}
