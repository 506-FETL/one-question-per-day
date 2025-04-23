import { describe, expect, it } from 'vitest'
import deepClone from './deepClone'

describe('deepClone function', () => {
  it('应在传入基本数据类型时正常运行', () => {
    expect(deepClone(1)).toBe(1)
    expect(deepClone('string')).toBe('string')
    expect(deepClone(null)).toBe(null)
    expect(deepClone(undefined)).toBe(undefined)
    expect(deepClone(true)).toBe(true)
  })

  it('应在传入对象时正常运行', () => {
    const obj = { a: 1, b: { c: 2 } }
    const clone = deepClone(obj)
    expect(clone).not.toBe(obj)
    expect(clone).toEqual(obj)
  })

  it('应在处理数组时正常运行', () => {
    const arr = [1, 2, { a: 3 }]
    const clone = deepClone(arr)
    expect(clone).not.toBe(arr)
    expect(clone).toEqual(arr)
  })

  it('应在处理Date对象时正常运行', () => {
    const date = new Date()
    const clone = deepClone(date)
    expect(clone).not.toBe(date)
    expect(clone.getTime()).toBe(date.getTime())
  })

  it('应在处理RegExp对象时正常运行', () => {
    const regex = /abc/gi
    const clone = deepClone(regex)
    expect(clone).not.toBe(regex)
    expect(clone.source).toBe(regex.source)
    expect(clone.flags).toBe(regex.flags)
  })

  it('应在处理Symbol时正常运行', () => {
    const sym = Symbol('desc')
    const obj = { [sym]: 'value' }
    const clone = deepClone(obj)
    expect(clone).not.toBe(obj)
    expect(clone[sym]).toBe('value')
  })

  it('应在处理循环引用时正常运行', () => {
    const obj = { name: 'Alice' }
    obj.self = obj // 循环引用
    const clone = deepClone(obj)
    expect(clone).not.toBe(obj)
    expect(clone.name).toBe('Alice')
    expect(clone.self).toBe(clone) // 确保循环引用被正确复制
  })

  it('应在处理复杂嵌套结构时正常运行', () => {
    const complexObj = {
      date: new Date(),
      regEx: /test/i,
      symbolKey: Symbol('key'),
      nested: {
        arr: [1, 2, 3],
        map: new Map([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]),
        set: new Set([1, 2, 3]),
        arrayWithObj: [
          { ['1']: 'jack' },
          2,
          3,
          { a: 1, b: 2, c: { d: /111/g, b: [1, 2, 3, Symbol(1)] } },
        ],
        [Symbol('symbol key')]: {
          [Symbol('1')]: [1, 2, 3, {}],
        },
      },
    }

    const clone = deepClone(complexObj)
    expect(clone).not.toBe(complexObj)
    expect(clone.nested.arr).toEqual([1, 2, 3])
  })
  it('应在对象包含方法时正常运行，并保持方法的功能', () => {
    const objWithMethod = {
      value: 42,
      getValue: function () {
        return this.value
      },
    }

    const clonedObjWithMethod = deepClone(objWithMethod)

    // 检查克隆后的对象结构
    expect(clonedObjWithMethod).not.toBe(objWithMethod)
    expect(typeof clonedObjWithMethod.getValue).toBe('function')

    // 检查克隆后的方法是否工作正常
    expect(clonedObjWithMethod.getValue()).toBe(42)

    // 修改克隆对象的值并检查方法输出
    clonedObjWithMethod.value = 100
    expect(clonedObjWithMethod.getValue()).toBe(100)

    // 原始对象应保持不变
    expect(objWithMethod.getValue()).toBe(42)
  })
  it('应在对象包含方法时正常运行，并保持方法的功能以及方法的属性', () => {
    const objWithMethod = {
      value: 42,
      getValue: function () {
        return this.value
      },
    }
    objWithMethod.getValue.a = objWithMethod
    const clonedObjWithMethod = deepClone(objWithMethod)

    // 检查克隆后的对象结构
    expect(clonedObjWithMethod).not.toBe(objWithMethod)
    expect(clonedObjWithMethod.getValue.a.value).toBe(42)

    // 检查克隆后的方法是否工作正常
    expect(clonedObjWithMethod.getValue()).toBe(42)

    // 修改克隆对象的值并检查方法输出
    clonedObjWithMethod.value = 100
    expect(clonedObjWithMethod.getValue()).toBe(100)

    // 原始对象应保持不变
    expect(objWithMethod.getValue()).toBe(42)
  })

  it('应确保深拷贝后的对象与原始对象不同，并且只包含原始对象上的key值', () => {
    function Parent() {
      this.a = 1
    }
    Parent.prototype.b = 2

    const obj = new Parent()
    const symKey = Symbol('sym')
    obj[symKey] = 'symbolValue'

    const clone = deepClone(obj)

    // 检查克隆后的对象与原始对象不同
    expect(clone).not.toBe(obj)

    // 检查克隆后的对象只包含原始对象上的key值
    expect(clone).toHaveProperty('a', 1)
    expect(clone).not.toHaveProperty('b') // 原型上的属性不应被拷贝

    // 检查symbol键是否被正确拷贝
    expect(clone[symKey]).toBe('symbolValue')
  })
})
