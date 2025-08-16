class Observable {
  constructor(setup) {
    this.execute = setup
  }

  nullObserve = {
    next: () => {},
    error: () => {},
    complete: () => {},
    unsubscribe: () => {},
  }

  observeWrapper = (observe) => {
    if (!observe) {
      return this.nullObserve
    }
    return {
      next: (...args) => {
        if (typeof observe === 'function')
          return observe(...args)
        if (observe.next)
          return observe.next(...args)
      },
      error: (...args) => {
        let res = new Error('error')
        if (observe.error)
          res = observe.error(...args)
        observe = this.nullObserve
        return res
      },
      complete: (...args) => {
        let res
        if (observe.complete)
          res = observe.complete(...args)
        observe = this.nullObserve
        return res
      },
      unsubscribe: () => {
        observe = this.nullObserve
      },
    }
  }

  subscribe(subscriber) {
    subscriber = this.observeWrapper(subscriber)
    this.execute(subscriber)

    return {
      unsubscribe: subscriber.unsubscribe,
      unsubscribed: true,
    }
  }
}
export default Observable
const observable = new Observable((sub) => {
  sub.next(1)
  sub.complete()
})
observable.subscribe({})
// observable.subscribe()
