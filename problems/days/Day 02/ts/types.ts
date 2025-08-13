// 生成器函数类型
export interface GeneratorFunction<TReturn = unknown> {
  (): Generator<unknown, TReturn, unknown>
}

// 异步函数类型
export interface AsyncFunction<TReturn = unknown> {
  (): Promise<TReturn>
}

// 生成器转异步函数的主函数类型
export interface GeneratorToAsyncFunction {
  <TReturn = unknown>(func: GeneratorFunction<TReturn>): AsyncFunction<TReturn>
}
