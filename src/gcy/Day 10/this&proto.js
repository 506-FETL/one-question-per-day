// 由于 Node 环境没有 window，用 globalThis 代替
const window = globalThis

/**
 * call
 * @param {*} context 希望函数里面指针指向的是什么
 * @param {*} args 函数调用的参数，数组形式
 * @returns 返回函数调用的结果
 */
Function.prototype.Call = function (context, ...args) {
  // 传进来的指针，没有传的话就是全局指针
  context = context || window
  // 这里面的this是指向的需要调用的函数
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = args ? context[fnKey](...args) : context[fnKey]()
  delete context.tempFunc
  return result
}

/**
 * apply 以特定的this执行函数
 * @param {*} context 希望函数里面指针指向的是什么
 * @param {*} args 函数调用的参数，数组形式
 * @returns 返回函数调用的结果
 */
Function.prototype.Apply = function (context, args) {
  // 传进来的指针，没有传的话就是全局指针
  context = context || window
  // 这里面的this是指向的需要调用的函数
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = args ? context[fnKey](...args) : context[fnKey]()
  delete context.tempFunc
  return result
}

/**
 * bind 永久改变函数内部的指针
 * @param {*} context 需要绑定的指针
 * @param  {...any} args 函数执行需要的参数
 */
Function.prototype.Bind = function (context, ...args) {
  const fn = this
  function bindFunc(...callArgs) {
    // 如果 this 是 boundFunction 的实例，说明通过 new 调用
    const isNewCall = this instanceof bindFunc
    const finalThis = isNewCall ? this : context
    const result = fn.apply(finalThis, [...args, ...callArgs])

    return result
  }
  // 继承原型（保留函数 prototype 用于 new）
  bindFunc.prototype = Object.create(fn.prototype)
  bindFunc.prototype.constructor = bindFunc
  return bindFunc
}
export function instanceOf(obj, fn) {
  // undefined 和 null 不是任何对象的实例
  if (obj === null || obj === undefined) {
    return false
  }
  const recursiveStack = [] //用于递归寻找
  recursiveStack.push(obj)
  while (recursiveStack.length !== 0) {
    const temp = recursiveStack.shift()
    if (temp.constructor === fn) {
      return true
    }
    if (temp.__proto__ !== null) {
      recursiveStack.push(temp.__proto__)
    }
  }
  return false
}
export function selfNew(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  const result = fn.Apply(obj, args)
  if (typeof result === 'object') {
    return result
  } else {
    return obj
  }
}
