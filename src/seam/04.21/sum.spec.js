import { describe, expect, it } from 'vitest'
import sum from './sum'

describe('04.21--default.实现一个sum()方法', () => {
  it('应在传入一个参数的情况下正常运行', () => {
    const sum1 = sum(1)

    expect(sum1 == 1).toBeTruthy()
  })

  it('应在不传入参数的情况下正常运行', () => {
    const sum1 = sum()

    expect(sum1 == 0).toBeTruthy()
  })

  it('应在连续调用多次的情况下正常运行', () => {
    const sum1 = sum(1)(2)(3)

    expect(sum1 == 6).toBeTruthy()
  })

  it('应不影响其他函数调用', () => {
    const sum1 = sum(1)

    expect(sum1(2) == 3).toBeTruthy()
    expect(sum1(3) == 4).toBeTruthy()
  })

  it('应在多种情况下正常运行', () => {
    const sum1 = sum(1)

    expect(sum1(2)()(3) == 6).toBeTruthy()
  })

  it('应在传入负数的情况下正常运行', () => {
    const sum1 = sum(-1)(-2)(-3)

    expect(sum1 == -6).toBeTruthy()
  })

  it('应在传入小数的情况下正常运行', () => {
    const sum1 = sum(1.5)(2.5)(3.5)

    expect(sum1 == 7.5).toBeTruthy()
  })

  it('应在混合正数和负数的情况下正常运行', () => {
    const sum1 = sum(5)(-3)(2)

    expect(sum1 == 4).toBeTruthy()
  })

  it('应在连续调用后返回正确的结果', () => {
    const sum1 = sum(10)
    const sum2 = sum1(20)
    const sum3 = sum2(30)

    expect(sum3 == 60).toBeTruthy()
  })

  it('应在多次调用后保持独立的状态', () => {
    const sum1 = sum(1)
    const sum2 = sum1(2)
    const sum3 = sum(3)

    expect(sum2(3) == 6).toBeTruthy()
    expect(sum3(4) == 7).toBeTruthy()
  })
})
