// call
Function.prototype.Call = function (context, ...args) {
  if (context == null) context = window

  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]

  return result
}

// apply
Function.prototype.Apply = function (context, args = []) {
  if (context == null) context = window

  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]

  return result
}

// bind
Function.prototype.Bind = function (context, ...args) {
  if (context == null) context = window

  const key = Symbol()
  const that = this

  const result = function (...newArgs) {
    if (this instanceof that) {
      this[key] = that
      const result = this[key](...args, ...newArgs)
      delete this[key]

      return result
    } else {
      context[key] = that
      const result = context[key](...args, ...newArgs)
      delete context[key]

      return result
    }
  }

  result.prototype = Object.create(that.prototype)
  result.prototype.constructor = result

  return result
}

export function instanceOf(obj, fn) {
  const proto = obj.__proto__

  if (proto) {
    if (proto === fn.prototype) {
      return true
    } else {
      return instanceOf(proto, fn)
    }
  } else {
    return false
  }
}

export function selfNew(fn, ...args) {
  const instance = Object.create(fn.prototype)
  const result = fn.apply(instance, args)

  return typeof result === 'function' || typeof result === 'object' ? result : instance
}
