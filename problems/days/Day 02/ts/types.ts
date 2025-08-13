// 生成器函数类型
export interface GeneratorFunction<TReturn = unknown> {
  (): Generator<unknown, TReturn, unknown>
}

// 异步函数类型
export interface AsyncFunction<TReturn = unknown> {
  (): Promise<TReturn>
}
