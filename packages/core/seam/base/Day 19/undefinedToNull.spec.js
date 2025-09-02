import { describe, expect, it } from 'vitest'
import undefinedToNull from './undefinedToNull'

describe('undefinedToNull - 基础类型处理', () => {
  it('返回 null 当输入是 undefined', () => {
    expect(undefinedToNull(undefined)).toBe(null)
  })

  it('返回相同的原始值（null/boolean/number/string）', () => {
    expect(undefinedToNull(null)).toBe(null)
    expect(undefinedToNull(true)).toBe(true)
    expect(undefinedToNull(0)).toBe(0)
    expect(undefinedToNull('BFE.dev')).toBe('BFE.dev')
  })

  it('返回同一个 Symbol/BigInt 值', () => {
    const s = Symbol('x')
    expect(undefinedToNull(s)).toBe(s)
    const b = BigInt(10)
    expect(undefinedToNull(b)).toBe(b)
  })
})

describe('undefinedToNull - 简单对象与数组', () => {
  it('对象属性为 undefined 替换为 null', () => {
    const input = { a: undefined, b: 'BFE.dev' }
    const out = undefinedToNull(input)
    expect(out).toEqual({ a: null, b: 'BFE.dev' })
  })

  it('数组元素为 undefined 替换为 null', () => {
    const input = ['BFE.dev', undefined, 'bigfrontend.dev']
    const out = undefinedToNull(input)
    expect(out).toEqual(['BFE.dev', null, 'bigfrontend.dev'])
  })

  it('不修改原对象（不可变性）', () => {
    const input = { a: undefined, b: { c: undefined } }
    const out = undefinedToNull(input)
    expect(input).toEqual({ a: undefined, b: { c: undefined } })
    expect(out).toEqual({ a: null, b: { c: null } })
    expect(out).not.toBe(input)
  })

  it('不修改原数组（不可变性）', () => {
    const input = [undefined, 1, { a: undefined }]
    const out = undefinedToNull(input)
    expect(out).toEqual([null, 1, { a: null }])
    expect(out).not.toBe(input)
    expect(out[2]).not.toBe(input[2])
  })
})

describe('undefinedToNull - 嵌套与混合结构', () => {
  it('深层嵌套对象与数组混合', () => {
    const input = {
      a: undefined,
      b: [1, undefined, { c: undefined, d: [undefined] }],
      e: { f: { g: undefined } },
    }
    const out = undefinedToNull(input)
    expect(out).toEqual({
      a: null,
      b: [1, null, { c: null, d: [null] }],
      e: { f: { g: null } },
    })
  })

  it('保持不存在的属性为缺失状态（不新增键）', () => {
    const input = {}
    const out = undefinedToNull(input)
    expect(Object.prototype.hasOwnProperty.call(out, 'a')).toBe(false)
  })
})

describe('undefinedToNull - 稀疏数组与空槽', () => {
  it('保留稀疏数组的空槽，不填充 null', () => {
    const arr = []
    arr[2] = 'x' // 索引 0、1 为空槽
    const out = undefinedToNull(arr)
    expect(0 in out).toBe(false)
    expect(1 in out).toBe(false)
    expect(out[2]).toBe('x')
    expect(out.length).toBe(3)
  })

  it('区别对待空槽与显式 undefined 元素', () => {
    const arr = [, undefined, , 'x'] // 0、2 空槽，1 为 undefined
    const out = undefinedToNull(arr)
    expect(0 in out).toBe(false)
    expect(out[1]).toBe(null)
    expect(2 in out).toBe(false)
    expect(out[3]).toBe('x')
  })
})

describe('undefinedToNull - 循环引用', () => {
  it('处理自引用对象', () => {
    const obj = { a: undefined }
    obj.self = obj
    const out = undefinedToNull(obj)
    expect(out.a).toBe(null)
    expect(out.self).toBe(out) // 仍是自引用
  })

  it('处理互相引用对象', () => {
    const a = { x: undefined }
    const b = { y: undefined }
    a.b = b
    b.a = a
    const outA = undefinedToNull(a)
    expect(outA.x).toBe(null)
    expect(outA.b.y).toBe(null)
    expect(outA.b.a).toBe(outA)
  })
})

describe('undefinedToNull - 特殊对象与内建类型', () => {
  // 如果你的实现仅支持普通对象和数组，可将以下与 Map/Set/TypedArray 相关的测试改为 it.skip

  it('date 保持同值（或等价新实例）', () => {
    const d = new Date('2020-01-01T00:00:00Z')
    const out = undefinedToNull(d)
    expect(out instanceof Date).toBe(true)
    expect(out.getTime()).toBe(d.getTime())
  })

  it('regExp 保持同值', () => {
    const r = /abc/gi
    const out = undefinedToNull(r)
    expect(out instanceof RegExp).toBe(true)
    expect(out.source).toBe('abc')
    expect(out.flags).toBe('gi')
  })

  it('map 中的值为 undefined 时替换为 null', () => {
    const m = new Map([
      ['a', undefined],
      ['b', 1],
    ])
    const out = undefinedToNull(m)
    expect(out instanceof Map).toBe(true)
    expect(out.get('a')).toBe(null)
    expect(out.get('b')).toBe(1)
  })

  it('map 中的嵌套对象/数组也被转换', () => {
    const m = new Map([
      ['o', { x: undefined, y: [undefined] }],
    ])
    const out = undefinedToNull(m)
    expect(out.get('o')).toEqual({ x: null, y: [null] })
  })

  it('set 中的元素为 undefined 时替换为 null，并保留去重语义', () => {
    const s = new Set([undefined, 1, undefined])
    const out = undefinedToNull(s)
    expect(out instanceof Set).toBe(true)
    expect(out.has(null)).toBe(true)
    expect(out.has(undefined)).toBe(false)
    expect(out.size).toBe(2) // null 和 1
  })

  it('typedArray/ArrayBuffer 保持二进制数据不变', () => {
    const ta = new Uint8Array([1, 2, 3])
    const out = undefinedToNull(ta)
    expect(out instanceof Uint8Array).toBe(true)
    expect(Array.from(out)).toEqual([1, 2, 3])
  })

  it('函数作为值保持原样（仅当值为 undefined 才替换）', () => {
    const fn = () => 42
    const input = { a: fn, b: undefined }
    const out = undefinedToNull(input)
    expect(out.a).toBe(fn)
    expect(out.b).toBe(null)
  })
})

describe('undefinedToNull - 原型与不可枚举属性', () => {
  it('仅处理自有可枚举属性（不污染原型）', () => {
    const proto = { p: undefined }
    const obj = Object.create(proto)
    Object.defineProperty(obj, 'hidden', {
      value: undefined,
      enumerable: false,
    })
    obj.visible = undefined

    const out = undefinedToNull(obj)
    // 原型链上的 p 不应出现在结果中
    expect(Object.prototype.hasOwnProperty.call(out, 'p')).toBe(false)
    // 不可枚举属性保持不可枚举（如果你的实现复制不可枚举属性，请调整断言）
    expect(Object.prototype.propertyIsEnumerable.call(out, 'hidden')).toBe(false)
    // 可枚举自有属性被替换
    expect(out.visible).toBe(null)
  })
})

describe('undefinedToNull - JSON 对齐行为验证', () => {
  it('对象中 undefined -> null 后 JSON.stringify 与预期一致', () => {
    const input = { a: undefined, b: 1 }
    const out = undefinedToNull(input)
    expect(JSON.stringify(out)).toBe('{"a":null,"b":1}')
  })

  it('数组中 undefined -> null 后 JSON.stringify 与预期一致', () => {
    const input = [undefined, 1]
    const out = undefinedToNull(input)
    expect(JSON.stringify(out)).toBe('[null,1]')
  })
})

describe('undefinedToNull - 其它边界', () => {
  it('symbol 作为对象键保持键语义，值中的 undefined 转为 null', () => {
    const k = Symbol('k')
    const input = { [k]: { x: undefined } }
    const out = undefinedToNull(input)
    expect(out[k].x).toBe(null)
  })

  it('naN/Infinity 等数值保持原样', () => {
    const input = { a: Number.NaN, b: Infinity, c: -Infinity }
    const out = undefinedToNull(input)
    expect(Number.isNaN(out.a)).toBe(true)
    expect(out.b).toBe(Infinity)
    expect(out.c).toBe(-Infinity)
  })

  it('空对象与空数组保持为空结构', () => {
    expect(undefinedToNull({})).toEqual({})
    expect(undefinedToNull([])).toEqual([])
  })
})
