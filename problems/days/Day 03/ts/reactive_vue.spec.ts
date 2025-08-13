import { describe, expect, it } from 'vitest'
import { effect, reactive } from './reactive_vue'

describe('Vue 简化响应式系统测试', () => {
  it('应在副作用中访问初始值', () => {
    const obj = reactive({ count: 0 })
    let dummy
    effect(() => {
      dummy = obj.count
    })
    expect(dummy).toBe(0)
  })

  it('数据变化应重新触发 effect 执行', () => {
    const obj = reactive({ count: 1 })
    let dummy
    effect(() => {
      dummy = obj.count
    })
    obj.count = 10
    expect(dummy).toBe(10)
  })

  it('多个属性应独立触发各自的 effect', () => {
    const obj = reactive({ a: 1, b: 2 })
    let dummyA, dummyB
    effect(() => {
      dummyA = obj.a
    })
    effect(() => {
      dummyB = obj.b
    })
    obj.a = 100
    expect(dummyA).toBe(100)
    expect(dummyB).toBe(2)
  })

  it('修改无关属性不应影响 effect', () => {
    const obj = reactive({ foo: 1, bar: 2 })
    let dummy = 0
    effect(() => {
      dummy = obj.foo
    })
    obj.bar++ // 改 bar 不应触发 dummy 更新
    expect(dummy).toBe(1)
  })

  it('应支持多次修改后仍保持响应', () => {
    const obj = reactive({ n: 0 })
    let log: number[] = []
    effect(() => {
      log.push(obj.n)
    })
    obj.n = 1
    obj.n = 2
    expect(log).toEqual([0, 1, 2])
  })
})
