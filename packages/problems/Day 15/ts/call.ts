declare global {
  interface Function {
    mycall: <T, A extends any[], R>(this: (...args: A) => R, thisArg: T, ...args: A) => R
  }
}

Function.prototype.mycall = function mycall(this: (...args: any[]) => any, thisArg: any, ...args: any[]) {

}
