// 手写call
Function.prototype.Call = function (context, ...args) {
  // context为undefined或null时，则this默认指向全局window
  if (context === undefined || context === null) {
    context = window
  }
  // 利用Symbol创建一个唯一的key值，防止新增加的属性与obj中的属性名重复
  const fn = Symbol(1)
  // this指向调用call的函数
  context[fn] = this
  // 隐式绑定this，如执行obj.foo(), foo内的this指向obj
  const res = context[fn](...args)
  // 执行完以后，删除新增加的属性
  delete context[fn]
  return res
}

// apply与call相似，只有第二个参数是一个数组，
Function.prototype.Apply = function (context, args = []) {
  if (context === undefined || context === null) {
    context = window
  }
  const fn = Symbol(2)
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

// bind要考虑返回的函数，作为构造函数被调用的情况
Function.prototype.Bind = function (context, ...args) {
  if (context === undefined || context === null) {
    context = window
  }
  const fn = this
  const f = Symbol(3)
  const result = function (...args1) {
    if (this instanceof fn) {
      // result如果作为构造函数被调用，this指向的是new出来的对象
      // this instanceof fn，判断new出来的对象是否为fn的实例
      this[f] = fn
      const res = this[f](...args, ...args1)
      delete this[f]
      return res
    }
    else {
      // bind返回的函数作为普通函数被调用时
      context[f] = fn
      const res = context[f](...args, ...args1)
      delete context[f]
      return res
    }
  }
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(fn.prototype)
  result.prototype.constructor = result
  return result
}

export function instanceOf(obj, fn) {
  const proto = obj.__proto__
  if (proto) {
    if (proto === fn.prototype) {
      return true
    }
    else {
      return instanceOf(proto, fn)
    }
  }
  else {
    return false
  }
}

export function selfNew(fn, ...args) {
  // 创建一个instance对象，该对象的原型是fn.prototype
  const instance = Object.create(fn.prototype)
  // 调用构造函数，使用apply，将this指向新生成的对象
  const res = fn.apply(instance, args)
  // 如果fn函数有返回值，并且返回值是一个对象或方法，则返回该对象，否则返回新生成的instance对象
  return typeof res === 'object' || typeof res === 'function' ? res : instance
}
