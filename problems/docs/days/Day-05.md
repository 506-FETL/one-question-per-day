---
tags: [复制,引用处理]
difficulty: hard
---

# Day 05

# 实现一个 深拷贝

## 示例

要求能够解决循环嵌套对象的深拷贝函数

```js
// 测试代码
const a = { name: "Alice" };
a.self = a; // 循环引用

const b = deepClone(a);
console.log(b); // 输出: { name: 'Alice', self: [Circular] }
/*
console.log 的输出结果中包含 [Circular],
这是因为 JavaScript 的控制台会检测到对象中的循环引用，
并用这个标记来表示，避免陷入无限循环。
事实上，我们的 deepClone 函数并不会在实际对象数据结构中插入 [Circular] 这类标记，
它只是一个视觉化的提示，帮助我们理解输出结果。
 */
```

## 题目模版

```js
/**
 * 深拷贝一个对象或数组。
 *
 * @param {any} obj - 要深拷贝的对象或数组。
 * @param {Map} [cache] - 用于存储已拷贝对象的缓存，防止循环引用。
 * @returns {any} 返回深拷贝后的对象或数组。
 */
export default function deepClone(obj, cache = new Map()) {

}
```

## 测试代码

```js
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
    const clone = deepClone(sym)
    expect(clone).not.toBe(sym)
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
          { 1: 'jack' },
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
      getValue() {
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
      getValue() {
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

```

## 答案

| 类型    | 路径                                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/days/Day 05/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2005/answer.js)       |
| TS 版本 | [problems/days/Day 05/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2005/ts/answer.ts) |
| Review  | [05.md](/review/05)                                                                                                                 |
