import { describe, expect, it } from 'vitest'
import add from './add'

describe('day 13 -- add', () => {
  it('应该正常简单相加', () => {
    const result = add[100]
    expect(result + 1).toBe(101)
  })

  it('应该能连续调用', () => {
    expect(add[100][200] + 100).toBe(400)
  })

  it('应该能保存状态', () => {
    const foo = add[100]
    const result = foo[200]

    expect(foo + 200).toBe(300)
    expect(result[-100] - 100).toBe(100)
    expect(result - 200).toBe(100)
  })
})
