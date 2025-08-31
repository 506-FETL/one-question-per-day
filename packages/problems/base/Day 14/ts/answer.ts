import type { CompleteFn, ErrorFn, NextFn, Subscriber } from './types'

export interface Subscription {
  unsubscribed: boolean
  unsubscribe: () => void
}

type SetupFn<T> = (observer: {
  unsubscribed: boolean
  next: NextFn<T>
  error: ErrorFn
  complete: CompleteFn
  unsubscribe: () => void
}) => void

export class Observable<T> {
  private _setup: SetupFn<T>

  constructor(setup: SetupFn<T>) {
    this._setup = setup
  }

  subscribe(subscriber?: Subscriber<T>): (Subscription & {
    next: NextFn<T>
    error: ErrorFn
    complete: CompleteFn
  }) | void {
    if (!subscriber)
      return

    const wrapper = {
      unsubscribed: false,
      next: (value: T) => {
        if (wrapper.unsubscribed)
          return
        if (typeof subscriber === 'function') {
          (subscriber as NextFn<T>)(value)
        }
        else {
          subscriber.next?.(value)
        }
      },
      error: (err: unknown) => {
        if (wrapper.unsubscribed)
          return
        wrapper.unsubscribe()
        if (typeof subscriber === 'object') {
          subscriber.error?.(err)
        }
      },
      complete: () => {
        if (wrapper.unsubscribed)
          return
        wrapper.unsubscribe()
        if (typeof subscriber === 'object') {
          subscriber.complete?.()
        }
      },
      unsubscribe: () => {
        wrapper.unsubscribed = true
      },
    }

    this._setup(wrapper)
    return wrapper
  }
}

export default Observable
