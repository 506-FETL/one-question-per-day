export default class Middleware {
  /**
   * @param {MiddlewareFunc} func
   */
  constructor() {
    this.middlewares = []
  }
  use(func) {
    this.middlewares.push(func)
  }
  /**
   * @param {Request} req
   */
  start(req) {
    const middlewares = this.middlewares
    let index = 0
    const next = async (err) => {
      const middleware = middlewares[index++]
      if (!middleware) return
      try {
        if(err) {
          if(middleware.length ===3) {
            await middleware(err,req,next)
          }else {
            await next(err)
          }
        }else {
          if(middleware.length <3){
            await middleware(req,next)
          }else {
            await next()
          }
        }
      } catch (newErr) {
        await next(newErr)
      }
    }
    next()
  }
}