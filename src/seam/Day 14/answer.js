class Observable {
  constructor(setup) {
    this._setup = setup
  }

  subscribe(subscriber) {
    const subscriberWrapper = {
      unsubscribed: false,
      next(value) {
        if (this.unsubscribed) return
        if (subscriber instanceof Function) return subscriber(value)
        return subscriber.next ? subscriber.next(value) : null
      },
      error(value) {
        if (this.unsubscribed) return
        this.unsubscribe()
        return subscriber.error ? subscriber.error(value) : null
      },
      complete() {
        if (this.unsubscribed) return
        this.unsubscribe()
        return subscriber.complete ? subscriber.complete() : null
      },
      unsubscribe() {
        this.unsubscribed = true
      },
    }
    if (!subscriber) return

    this._setup(subscriberWrapper)
    return subscriberWrapper
  }
}

export default Observable
