export default class Middleware {
  constructor() {
    this.cbQueue = []
    this.step = 0
    this.next = this.next.bind(this)
  }
  start(req) {
    this.req = req
    this.next()
  }
  use(cb) {
    this.cbQueue.push(cb)
  }
  next(err) {
    try {
      if (err) {
        throw err
      }
      if (this.step < this.cbQueue.length) {
        Promise.resolve(this.cbQueue[this.step++](this.req, this.next)).catch((error) => {
          return this.next(error)
        })
      }
    } catch (error) {
      while (this.step < this.cbQueue.length) {
        if (this.cbQueue[this.step].length === 3) {
          Promise.resolve(this.cbQueue[this.step++](error, this.req, this.next)).catch(
            (error) => {
              return this.next(error)
            },
          )
          break
        } else {
          this.step++
        }
      }
    }
  }
}
