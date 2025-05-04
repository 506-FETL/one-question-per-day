import { describe, expect, it } from 'vitest'
import myFrom from './myFrom'

describe('myFrom function', () => {
  it('应正确处理基本的数组类对象', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
    const result = myFrom(arrayLike)
    expect(result).toEqual(['a', 'b', 'c'])
  })
  it('应正确处理 length 为负数的情况', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: -1 }
    const result = myFrom(arrayLike)
    expect(result).toEqual([])
  })

  it('应正确处理字符串', () => {
    const result = myFrom('abc')
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('应正确处理空的数组类对象', () => {
    const arrayLike = { length: 0 }
    const result = myFrom(arrayLike)
    expect(result).toEqual([])
  })

  it('应正确应用mapFn', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 }
    const result = myFrom(arrayLike, (value) => value * 2)
    expect(result).toEqual([2, 4, 6])
  })

  it('应正确处理thisArg', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 }
    const context = { multiplier: 3 }
    const result = myFrom(
      arrayLike,
      function (value) {
        return value * this.multiplier
      },
      context,
    )
    expect(result).toEqual([3, 6, 9])
  })

  it('应抛出错误，当arrayLike为null或undefined时', () => {
    expect(() => myFrom(null)).toThrow(TypeError)
    expect(() => myFrom(undefined)).toThrow(TypeError)
  })

  it('应抛出错误，当mapFn不是函数时', () => {
    const arrayLike = { 0: 1, 1: 2, length: 2 }
    expect(() => myFrom(arrayLike, 123)).toThrow(TypeError)
  })

  it('应正确处理稀疏数组类对象', () => {
    const arrayLike = { 0: 'a', 2: 'c', length: 4 }
    const result = myFrom(arrayLike)
    expect(result).toEqual(['a', undefined, 'c', undefined])
    expect(result.length).toBe(4)
  })

  it('应正确处理长度超出Number.MAX_SAFE_INTEGER的情况', () => {
    const arrayLike = { length: Number.MAX_SAFE_INTEGER + 1 }
    expect(() => myFrom(arrayLike)).toThrow(RangeError)
  })

  it('应正确处理负数长度', () => {
    const arrayLike = { length: -5 }
    const result = myFrom(arrayLike)
    expect(result).toEqual([])
    expect(result.length).toBe(0)
  })

  it('应正确处理可迭代对象（如Set）', () => {
    const set = new Set([1, 2, 3])
    const result = myFrom(set)
    expect(result).toEqual([1, 2, 3])
  })

  it('应正确处理可迭代对象（如Map）', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ])
    const result = myFrom(map)
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })

  it('应正确处理带有非数字length属性的对象', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: '2' }
    const result = myFrom(arrayLike)
    expect(result).toEqual(['a', 'b'])
  })

  it('应正确处理length为NaN的情况', () => {
    const arrayLike = { 0: 'a', length: NaN }
    const result = myFrom(arrayLike)
    expect(result).toEqual([])
  })

  it('应正确处理mapFn的第二个参数index', () => {
    const arrayLike = { 0: 10, 1: 20, length: 2 }
    const result = myFrom(arrayLike, (v, i) => i)
    expect(result).toEqual([0, 1])
  })

  it('应正确处理mapFn返回undefined的情况', () => {
    const arrayLike = { 0: 1, 1: 2, length: 2 }
    const result = myFrom(arrayLike, () => undefined)
    expect(result).toEqual([undefined, undefined])
  })

  it('应正确处理thisArg为null的情况', () => {
    const arrayLike = { 0: 2, 1: 4, length: 2 }
    function fn(v) {
      return this ? this.x * v : v
    }
    const result = myFrom(arrayLike, fn, null)
    expect(result).toEqual([2, 4])
  })

  it('应正确处理mapFn为箭头函数时的this', () => {
    const arrayLike = { 0: 2, 1: 4, length: 2 }
    const context = { x: 10 }
    const result = myFrom(arrayLike, (v) => (this?.x ? this.x * v : v), context)
    expect(result).toEqual([2, 4])
  })

  it('应正确处理对象没有length属性的情况', () => {
    const obj = { 0: 'a', 1: 'b' }
    const result = myFrom(obj)
    expect(result).toEqual([])
  })
})
