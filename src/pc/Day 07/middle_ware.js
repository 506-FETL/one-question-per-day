export default class Middleware {
  cbList = []
  errList = []
  use(cb) {
    if (cb.length === 3) this.errList.push(cb)
    if (cb.length === 2) this.cbList.push(cb)
  }
  start(req) {
    const _this = this
    let cbIndex = 0,
      errIndex = 0
    function next(error) {
      let currentFunc = null
      const args = [req, next]
      if (error) {
        currentFunc = _this.errList[errIndex++]
        args.unshift(error)
      } else {
        currentFunc = _this.cbList[cbIndex++]
      }
      try {
        currentFunc &&
          Promise.resolve(currentFunc.call(_this, ...args)).catch((error) => next(error))
      } catch (error) {
        next(error)
      }
    }
    next()
  }
}
