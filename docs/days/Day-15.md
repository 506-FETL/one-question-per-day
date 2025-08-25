---
tags: [this,绑定规则]
difficulty: medium
---

# Day 15

# Function.prototype.call

[Function.prototype.call](https://tc39.es/ecma262/#sec-function.prototype.call)可以用来很方便的修改函数的this。

你能实现一个myCall来模拟Function.prototype.call吗？

根据最新的 [ECMAScript spec](https://tc39.es/ecma262/#sec-function.prototype.call)，thisArg 不会被类型转换，在 [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)下也不会被更改为window。

你的代码需要遵从上述逻辑，实现非strict mode的情况。

Function.prototype.call/apply/bind和 [Reflect.apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply) 可以了解，但请不要在这里使用。

## 题目模版

```js
Function.prototype.mycall = function (thisArg, ...args) {

}
```

## 测试代码

```js
import { describe, expect, it } from 'vitest'
import './call.js'

describe('function.prototype.mycall', () => {
  it('应该正确调用函数并返回结果', () => {
    function add(a, b) {
      return a + b
    }

    const result = add.mycall(null, 2, 3)
    expect(result).toBe(5)
  })

  it('应该正确设置this上下文', () => {
    function getName() {
      return this.name
    }

    const obj = { name: '张三' }
    const result = getName.mycall(obj)
    expect(result).toBe('张三')
  })

  it('应该处理undefined的thisArg', () => {
    function getThis() {
      return this
    }

    const result = getThis.mycall(undefined)
    expect(result).toBe(window)
  })

  it('应该处理null的thisArg', () => {
    function getThis() {
      return this
    }

    const result = getThis.mycall(null)
    expect(result).toBe(window)
  })

  it('应该将原始类型转换为对象', () => {
    function getType() {
      return typeof this
    }

    const result = getType.mycall('hello')
    expect(result).toBe('object')
  })

  it('应该传递多个参数', () => {
    function multiply(a, b, c) {
      return a * b * c
    }

    const result = multiply.mycall(null, 2, 3, 4)
    expect(result).toBe(24)
  })

  it('应该处理返回对象的函数', () => {
    function createObject(name, age) {
      return { name, age, context: this }
    }

    const thisArg = { id: 1 }
    const result = createObject.mycall(thisArg, '李四', 25)
    expect(result.name).toBe('李四')
    expect(result.age).toBe(25)
    expect(result.context).toBe(thisArg)
  })

  it('应该正确处理传入基本类型的对象', () => {
    const returnThis = function () {
      return this
    }

    expect(typeof returnThis.mycall(1)).toBe('object')
    expect(returnThis.mycall(1).valueOf()).toBe(1)
    expect(typeof returnThis.mycall('1')).toBe('object')
    expect(returnThis.mycall('1').valueOf()).toBe('1')
  })
})

```

## 答案

| 类型    | 路径                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 15/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2015/answer.js)       |
| TS 版本 | [problems/Day 15/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2015/ts/answer.ts) |
| Review  | [15.md](/review/15)                                                                                                       |
