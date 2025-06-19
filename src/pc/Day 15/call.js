Function.prototype.mycall = function (thisArg, ...args) {
  const thisFunction = this

  if (thisArg == undefined) {
    thisArg = window
  }
  if (typeof thisArg !== 'object') {
    thisArg = Object(thisArg)
  }
  thisArg.thisFunction = thisFunction
  const res = thisArg.thisFunction(...args)
  return res
}
