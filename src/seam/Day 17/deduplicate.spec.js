import { describe, it, expect } from 'vitest'
import deduplicate from './deduplicate'

describe('deduplicate', () => {
  it('数字类型去重，原数组被修改', () => {
    const arr = [1, 2, 2, 3, 1, 4, 3, 5]
    deduplicate(arr)
    expect(arr.sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('字符串类型去重，原数组被修改', () => {
    const arr = ['a', 'b', 'a', 'c', 'b', '']
    deduplicate(arr)
    expect(arr.sort()).toEqual(['', 'a', 'b', 'c'])
  })

  it('布尔类型去重，原数组被修改', () => {
    const arr = [true, false, true, false, true]
    deduplicate(arr)
    expect(arr.sort()).toEqual([false, true])
  })

  it('undefined 和 null 去重，原数组被修改', () => {
    const arr = [undefined, null, undefined, null, 1]
    deduplicate(arr)
    expect(arr).toEqual(expect.arrayContaining([undefined, null, 1]))
    expect(arr.length).toBe(3)
  })

  it('BigInt 类型去重，原数组被修改', () => {
    const arr = [1n, 2n, 1n, 3n, 2n]
    deduplicate(arr)
    expect(arr.sort((a, b) => (a > b ? 1 : -1))).toEqual([1n, 2n, 3n])
  })

  it('Symbol 类型去重，原数组被修改', () => {
    const s1 = Symbol('foo')
    const s2 = Symbol('foo')
    const s3 = Symbol.for('bar')
    const s4 = Symbol.for('bar')
    const arr = [s1, s2, s1, s3, s4]
    deduplicate(arr)
    // s1和s2不同，s3和s4相同
    expect(arr).toContain(s1)
    expect(arr).toContain(s2)
    expect(arr.filter((x) => x === s3 || x === s4).length).toBe(1)
    expect(arr.length).toBe(3)
  })

  it('NaN 去重，原数组被修改', () => {
    const arr = [NaN, NaN, 1, NaN]
    deduplicate(arr)
    expect(arr).toContain(1)
    expect(arr.filter(Number.isNaN).length).toBe(1)
    expect(arr.length).toBe(2)
  })

  it('对象引用去重，原数组被修改', () => {
    const o1 = { a: 1 }
    const o2 = { a: 1 }
    const arr = [o1, o2, o1, o2]
    deduplicate(arr)
    expect(arr).toContain(o1)
    expect(arr).toContain(o2)
    expect(arr.length).toBe(2)
  })

  it('数组引用去重，原数组被修改', () => {
    const a1 = [1]
    const a2 = [1]
    const arr = [a1, a2, a1]
    deduplicate(arr)
    expect(arr).toContain(a1)
    expect(arr).toContain(a2)
    expect(arr.length).toBe(2)
  })

  it('函数引用去重，原数组被修改', () => {
    const f1 = () => 1
    const f2 = () => 2
    const arr = [f1, f2, f1]
    deduplicate(arr)
    expect(arr).toContain(f1)
    expect(arr).toContain(f2)
    expect(arr.length).toBe(2)
  })

  it('Date/RegExp/Map/Set 引用去重，原数组被修改', () => {
    const d1 = new Date()
    const d2 = new Date()
    const r1 = /a/
    const r2 = /a/
    const m1 = new Map()
    const m2 = new Map()
    const s1 = new Set()
    const s2 = new Set()
    const arr = [d1, d2, d1, r1, r2, r1, m1, m2, m1, s1, s2, s1]
    deduplicate(arr)
    expect(arr).toContain(d1)
    expect(arr).toContain(d2)
    expect(arr).toContain(r1)
    expect(arr).toContain(r2)
    expect(arr).toContain(m1)
    expect(arr).toContain(m2)
    expect(arr).toContain(s1)
    expect(arr).toContain(s2)
    expect(arr.length).toBe(8)
  })

  it('混合类型去重，原数组被修改', () => {
    const s = Symbol('x')
    const o = { a: 1 }
    const a = [1]
    const f = () => 1
    const d = new Date()
    const arr = [
      1,
      '1',
      1,
      '1',
      true,
      false,
      true,
      null,
      undefined,
      null,
      s,
      s,
      o,
      o,
      a,
      a,
      f,
      f,
      d,
      d,
      NaN,
      NaN,
    ]
    deduplicate(arr)
    // 检查每种类型只保留一个
    expect(arr.filter((x) => x === 1).length).toBe(1)
    expect(arr.filter((x) => x === '1').length).toBe(1)
    expect(arr.filter((x) => x === true).length).toBe(1)
    expect(arr.filter((x) => x === false).length).toBe(1)
    expect(arr.filter((x) => x === null).length).toBe(1)
    expect(arr.filter((x) => x === undefined).length).toBe(1)
    expect(arr.filter((x) => x === s).length).toBe(1)
    expect(arr.filter((x) => x === o).length).toBe(1)
    expect(arr.filter((x) => x === a).length).toBe(1)
    expect(arr.filter((x) => x === f).length).toBe(1)
    expect(arr.filter((x) => x === d).length).toBe(1)
    expect(arr.filter(Number.isNaN).length).toBe(1)
  })

  it('空数组和单元素数组', () => {
    const arr1 = []
    deduplicate(arr1)
    expect(arr1).toEqual([])

    const arr2 = [42]
    deduplicate(arr2)
    expect(arr2).toEqual([42])
  })

  it('稀疏数组去重，原数组被修改', () => {
    const arr = [1, , 2, , 1, , 3]
    deduplicate(arr)
    // 稀疏数组去重后，空位只保留一个
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3]))
    // 检查空位数量
    let holes = 0
    for (let i = 0; i < arr.length; i++) {
      if (!(i in arr)) holes++
    }
    expect(holes).toBe(1)
    expect(arr.length).toBe(4)
  })

  it('所有元素都不同', () => {
    const arr = [1, 'a', true, null, undefined, {}, [], () => 1, Symbol('x'), 1n]
    const before = arr.slice()
    deduplicate(arr)
    expect(arr.length).toBe(before.length)
    before.forEach((item) => expect(arr).toContain(item))
  })

  it('所有元素都相同', () => {
    const arr = [5, 5, 5, 5, 5]
    deduplicate(arr)
    expect(arr).toEqual([5])
  })

  it('调用后原数组已去重且未返回新数组', () => {
    const arr = [1, 1, 2, 2, 3, 3]
    const ref = arr
    const ret = deduplicate(arr)
    expect(arr).toBe(ref)
    expect(ret).toBeUndefined()
    expect(arr.sort()).toEqual([1, 2, 3])
  })
})
