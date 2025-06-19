import './call.js'
import { describe, it, expect } from 'vitest'

describe('Function.prototype.mycall', () => {
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
