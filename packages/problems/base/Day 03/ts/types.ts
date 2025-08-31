// 副作用函数类型
export type EffectFunction = () => void

// effect函数接口
export interface EffectFunc {
  (fn: EffectFunction): void
}

// reactive函数接口
export interface ReactiveFunc {
  <T extends Record<string, unknown>>(obj: T): T
}
