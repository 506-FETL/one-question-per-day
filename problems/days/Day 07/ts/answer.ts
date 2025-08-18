export type MiddlewareFunction = (req: unknown, next: NextFunction) => void | Promise<void>
export type ErrorMiddlewareFunction = (err: Error, req: unknown, next: NextFunction) => void | Promise<void>
export type NextFunction = (err?: Error) => void

export default class Middleware {
  private cbHandlers: MiddlewareFunction[] = []
  private errHandlers: ErrorMiddlewareFunction[] = []

  use(func: MiddlewareFunction | ErrorMiddlewareFunction): void {
    if (func.length === 2) {
      this.cbHandlers.push(func as MiddlewareFunction)
    }
    if (func.length === 3) {
      this.errHandlers.push(func as ErrorMiddlewareFunction)
    }
  }

  start(req: any): void {
    let idx = 0
    let errIdx = 0

    const next = (nextErr?: Error): void => {
      let func: MiddlewareFunction | ErrorMiddlewareFunction | undefined

      if (nextErr) {
        func = this.errHandlers[errIdx++]
        if (func) {
          try {
            Promise.resolve((func as ErrorMiddlewareFunction)(nextErr, req, next))
              .catch((error: Error) => next(error))
          }
          catch (error) {
            next(error as Error)
          }
        }
      }
      else {
        func = this.cbHandlers[idx++]
        if (func) {
          try {
            Promise.resolve((func as MiddlewareFunction)(req, next))
              .catch((error: Error) => next(error))
          }
          catch (error) {
            next(error as Error)
          }
        }
      }
    }

    next()
  }
}
