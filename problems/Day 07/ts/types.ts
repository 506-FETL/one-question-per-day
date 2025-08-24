export type MiddlewareFunction = (req: unknown, next: NextFunction) => void | Promise<void>
export type ErrorMiddlewareFunction = (err: Error, req: unknown, next: NextFunction) => void | Promise<void>
export type NextFunction = (err?: Error) => void

export interface MiddleWare {
  use: (func: MiddlewareFunction | ErrorMiddlewareFunction) => void
  start: (req: any) => void
}
