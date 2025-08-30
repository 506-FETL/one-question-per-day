Function.prototype.mycall = function (thisArg, ...args) {
  const key = Symbol(1)
  if (thisArg === void 0 || thisArg === null)
    thisArg = window
  else if (typeof thisArg !== 'object')
    thisArg = new Object(thisArg)

  thisArg[key] = this
  const result = thisArg[key](...args)
  delete thisArg[key]

  return result
}
