// 求和函数的返回类型，既是函数又可以转换为数字
export interface SumWrapper {
  (newArg?: number): SumWrapper
  [Symbol.toPrimitive]: () => number
}

// 主求和函数接口
export interface SumFunction {
  (v?: number): SumWrapper
}
