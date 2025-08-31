export type PromiseState = 'pending' | 'fulfilled' | 'rejected'

export type Executor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void

export type OnFulfilled<T, R> = ((value: T) => R | PromiseLike<R>) | null | undefined
export type OnRejected<R> = ((reason: any) => R | PromiseLike<R>) | null | undefined

export interface Handler<T, R> {
  onFulfilled?: OnFulfilled<T, R>
  onRejected?: OnRejected<R>
  resolve: (value: R | PromiseLike<R>) => void
  reject: (reason?: any) => void
}
