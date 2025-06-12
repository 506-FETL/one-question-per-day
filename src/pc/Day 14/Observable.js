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
    if (typeof observe !== 'function') {
      if (!observe) {
        return this.nullObserve
      }
      return {
        next: (...args) => {
          if (observe.next) return observe.next(...args)
        },
        error: (...args) => {
          let res
          if (observe.error) res = observe.error(...args)
          observe = this.nullObserve
          return res
        },
        complete: (...args) => {
          let res
          if (observe.complete) res = observe.complete(...args)
          observe = this.nullObserve
          return res
        },
        unsubscribe: () => {
          observe = this.nullObserve
        },
      }
    } else {
      return {
        next: (...args) => {
          return observe(...args)
        },
        error: () => {},
        complete: () => {},
        unsubscribe: () => {
          observe = this.nullObserve
        },
      }
    }
  }
  subscribe(subscriber) {
    subscriber = this.observeWrapper(subscriber)
    try {
      this.execute(subscriber)
    } catch (error) {
      throw new error()
    }
    return {
      unsubscribe: subscriber.unsubscribe,
      unsubscribed: true,
    }
  }
}
export default Observable
