// 由于 Node 环境没有 window，用 globalThis 代替
const window = globalThis

// call
Function.prototype.Call = function (context, ...args) {}

// apply
Function.prototype.Apply = function (context, args) {}

// bind
Function.prototype.Bind = function (context, ...args) {}

export function instanceOf(obj, fn) {}

export function selfNew(fn, ...args) {}
