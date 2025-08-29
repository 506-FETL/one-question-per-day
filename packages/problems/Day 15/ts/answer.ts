declare global {
  interface Function {
    mycall: <T, A extends any[], R>(this: (...args: A) => R, thisArg: T, ...args: A) => R
  }
}

Function.prototype.mycall = function mycall(this: (...args: any[]) => any, thisArg: any, ...args: any[]) {
  const key = Symbol('mycall-temp')
  // null / undefined 绑定到全局对象，其它原始值装箱
  if (thisArg === null || thisArg === undefined)
    thisArg = globalThis
  else if (typeof thisArg !== 'object' && typeof thisArg !== 'function')
    thisArg = new Object(thisArg)

  const target = thisArg as Record<PropertyKey, any>
  target[key] = this
  try {
    return target[key](...args)
  }
  finally {
    delete target[key]
  }
}

export {}
