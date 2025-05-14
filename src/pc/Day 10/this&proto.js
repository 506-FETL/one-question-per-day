// 由于 Node 环境没有 window，用 globalThis 代替
const window = globalThis

// call
Function.prototype.Call = function (context, ...args) {
  if (context == null) {
    context = window
  }
  context = Object(context)
  const func = Symbol('func')
  context[func] = this
  const res = context[func](...args)
  delete context[func]
  return res
}

// apply
Function.prototype.Apply = function (context, args) {
  if (context == null) {
    context = window
  }
  // 处理 args 参数
  if (args == null) {
    args = []
  } else if (!Array.isArray(args) && !(typeof args === 'object' && 'length' in args)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  context = Object(context)
  const func = Symbol('func')
  context[func] = this
  const res = context[func](...args)
  delete context[func]
  return res
}

// bind
Function.prototype.Bind = function (context, ...args) {
  if (context == null) {
    context = window
  }
  const _this = this
  const returnFunc = function (...newArgs) {
    if (this instanceof _this) {
      // 被new调用,自动设置了prototype为returnFunc
      return _this.apply(this, [...args, ...newArgs])
    } else {
      return _this.apply(context, [...args, ...newArgs])
    }
  }
  // 设置原型链
  returnFunc.prototype = Object.create(_this.prototype)
  returnFunc.prototype.constructor = returnFunc

  return returnFunc
}
export function instanceOf(obj, fn) {
  if (obj.__proto__ == null) return false
  if (typeof fn !== 'function') {
    throw new TypeError("Right-hand side of 'instanceof' is not callable")
  }
  if (obj.__proto__.constructor !== fn) {
    return instanceOf(obj.__proto__, fn)
  } else {
    return true
  }
}

export function selfNew(fn, ...args) {
  const newThis = new Object()
  const res = fn.call(newThis, ...args)
  if (res instanceof Object) return res
  Object.setPrototypeOf(newThis, fn.prototype)
  return newThis
}
