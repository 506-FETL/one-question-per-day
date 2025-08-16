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
