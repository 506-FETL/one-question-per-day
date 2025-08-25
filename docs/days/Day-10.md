---
tags: [this,原型链]
difficulty: medium
---

<Badge type="warning" text="medium" />
<Badge type="info" text="this" />
<Badge type="info" text="原型链" />

# Day 10

# 手写 call、apply、bind、instanceof 和 new

## 题目描述

请你分别实现以下几个 JavaScript 基础原理相关的方法：

1. **手写 call 方法**
   实现一个自定义的 `Call` 方法，使其能模拟原生 `Function.prototype.call` 的功能。

2. **手写 apply 方法**
   实现一个自定义的 `Apply` 方法，使其能模拟原生 `Function.prototype.apply` 的功能。

3. **手写 bind 方法**
   实现一个自定义的 `Bind` 方法，使其能模拟原生 `Function.prototype.bind` 的功能，并且能正确处理作为构造函数使用的情况。

4. **手写 instanceof 方法**
   实现一个函数 `instanceOf(obj, Fn)`，判断 `obj` 是否为构造函数 `Fn` 的实例，模拟原生 `instanceof` 运算符的行为。

5. **手写 new 操作符**
   实现一个函数 `selfNew(Fn, ...args)`，模拟 `new Fn(...args)` 的行为，返回一个新对象，并正确处理构造函数返回对象的情况。

## 要求

- 不允许直接使用原生的 `call`、`apply`、`bind`、`instanceof`、`new`。
- 代码需考虑边界情况和兼容性。
- 每个方法请用注释说明实现思路。

## 示例

```js
function Person(name) {
  this.name = name;
}
const obj = {};

Person.Call(obj, "Tom");
console.log(obj.name); // 'Tom'

function Animal() {}
const dog = selfNew(Animal);
console.log(instanceOf(dog, Animal)); // true
```

## 题目模版

```js
// call
Function.prototype.Call = function (context, ...args) {}

// apply
Function.prototype.Apply = function (context, args) {}

// bind
Function.prototype.Bind = function (context, ...args) {}

export function instanceOf(obj, fn) {}

export function selfNew(fn, ...args) {}
```

## 测试代码

```js
import { describe, expect, it, suite } from 'vitest'
import { instanceOf, selfNew } from './this&proto.js'

describe('day10 - this&proto', () => {
  suite('自定义Call方法测试', () => {
    it('应该可以正确绑定this上下文', () => {
      function greet() {
        return `你好, ${this.name}`
      }
      const person = { name: '张三' }
      expect(greet.Call(person)).toBe('你好, 张三')
    })

    it('应该可以传递参数', () => {
      function add(a, b) {
        return a + b + this.c
      }
      const obj = { c: 3 }
      expect(add.Call(obj, 1, 2)).toBe(6)
    })

    it('当context为null或undefined时，应该默认使用全局对象', () => {
      function getThis() {
        return this
      }
      expect(getThis.Call(null)).toBe(window)
      expect(getThis.Call(undefined)).toBe(window)
    })
  })

  suite('自定义Apply方法测试', () => {
    it('应该可以正确绑定this上下文', () => {
      function greet() {
        return `你好, ${this.name}`
      }
      const person = { name: '李四' }
      expect(greet.Apply(person)).toBe('你好, 李四')
    })

    it('当context为null或undefined时，应该默认使用全局对象', () => {
      function getThis() {
        return this
      }

      expect(getThis.Apply(null)).toBe(window)
      expect(getThis.Apply(undefined)).toBe(window)
    })

    it('应该可以传递参数数组', () => {
      function add(a, b) {
        return a + b + this.c
      }
      const obj = { c: 3 }
      expect(add.Apply(obj, [1, 2])).toBe(6)
    })
  })

  suite('自定义Bind方法测试', () => {
    it('应该返回一个新函数', () => {
      function greet() {}
      const boundGreet = greet.Bind({})
      expect(typeof boundGreet).toBe('function')
    })

    it('返回的函数应正确绑定this上下文', () => {
      function greet() {
        return `你好, ${this.name}`
      }
      const person = { name: '王五' }
      const boundGreet = greet.Bind(person)
      expect(boundGreet()).toBe('你好, 王五')
    })

    it('应该将预设参数与调用时的参数合并', () => {
      function add(a, b, c) {
        return a + b + c + this.d
      }
      const obj = { d: 4 }
      const boundAdd = add.Bind(obj, 1, 2)
      expect(boundAdd(3)).toBe(10)
    })

    it('作为构造函数使用时，this指向新创建的对象', () => {
      function Person(name) {
        this.name = name
      }
      Person.prototype.getName = function () {
        return this.name
      }

      const BoundPerson = Person.Bind(null, '赵六')
      const person = new BoundPerson()

      expect(person instanceof Person).toBe(true)
      expect(person.name).toBe('赵六')
      expect(person.getName()).toBe('赵六')
    })

    it('bind 返回的构造函数实例的 constructor 应该指向自身', () => {
      function Person(name) {
        this.name = name
      }
      const BoundPerson = Person.Bind(null, '张三')
      const p = new BoundPerson()
      expect(p.constructor).toBe(BoundPerson)
    })
  })

  suite('instanceOf函数测试', () => {
    it('应该正确检测对象是否为某个构造函数的实例', () => {
      class Animal {}
      class Dog extends Animal {}

      const dog = new Dog()

      expect(instanceOf(dog, Dog)).toBe(true)
      expect(instanceOf(dog, Animal)).toBe(true)
      expect(instanceOf(dog, Object)).toBe(true)
      expect(instanceOf(dog, Array)).toBe(false)
    })
  })

  suite('selfNew函数测试', () => {
    it('应该正确创建构造函数的实例', () => {
      function Person(name) {
        this.name = name
      }
      Person.prototype.sayHello = function () {
        return `你好，我是${this.name}`
      }

      const person = selfNew(Person, '钱七')

      expect(person instanceof Person).toBe(true)
      expect(person.name).toBe('钱七')
      expect(person.sayHello()).toBe('你好，我是钱七')
    })

    it('当构造函数返回对象时，应该返回该对象', () => {
      function Creator() {
        return { custom: true }
      }

      const obj = selfNew(Creator)
      expect(obj instanceof Creator).toBe(false)
      expect(obj.custom).toBe(true)
    })

    it('当构造函数返回非对象时，应该返回新创建的实例', () => {
      function NumberCreator() {
        this.value = 42
        return 100
      }

      const obj = selfNew(NumberCreator)
      expect(obj instanceof NumberCreator).toBe(true)
      expect(obj.value).toBe(42)
    })
  })
})

```

## 答案

| 类型    | 路径                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 10/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2010/answer.js) |
| Review  | [10.md](/review/10)                                                                                                 |
