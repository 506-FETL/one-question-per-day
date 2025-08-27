export type NextFn<T> = (value: T) => void
export type ErrorFn = (err: unknown) => void
export type CompleteFn = () => void

export interface SubscriberObject<T> {
  next?: NextFn<T>
  error?: ErrorFn
  complete?: CompleteFn
}

export type Subscriber<T> = NextFn<T> | SubscriberObject<T>

export interface Subscription {
  unsubscribed: boolean
  unsubscribe: () => void
}
