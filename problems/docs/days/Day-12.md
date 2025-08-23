---
tags: [函数式管道]
difficulty: easy
---

# Day 12

# 实现一个 `compose` 函数

在函数式编程当中有一个很重要的概念就是**函数组合**，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果

在多个框架源码中都有用到，比如 `redux` `koa` 中多次遇到这个方法

效果： 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数结合[f, g, h ]，通过 compose 最终达到这样的效果： h(g(f()))

**compose 函数要求：可执行同步方法，也可执行异步方法，两者都可以兼容**

## 题目模版

```js
/**
 * 组合多个函数，返回一个新的函数，按从右到左的顺序依次执行这些函数，并支持异步操作。
 *
 * @param {Function[]} fns - 要组合的函数数组。每个函数接收上一个函数的返回值作为参数，可以返回 Promise 或普通值。
 * @returns {Function} 返回一个新的函数，接收任意参数，依次执行组合的函数，返回最终的 Promise。
 */
export default function compose(fns) {

}
```

## 测试代码

```js
import { describe, expect, it } from 'vitest'
import compose from './compose'

describe('compose函数', () => {
  it('应该正确组合同步函数', async () => {
    const add = x => x + 1
    const multiply = x => x * 2
    const subtract = x => x - 3

    const composed = compose([add, multiply, subtract])
    const result = await composed(5)

    // (5 + 1) * 2 - 3 = 9
    expect(result).toBe(9)
  })

  it('应该正确将参数传递给第一个函数', async () => {
    const add = (x, y) => x + y
    const multiply = x => x * 2

    const composed = compose([add, multiply])
    const result = await composed(5, 3)

    // (5 + 3) * 2 = 16
    expect(result).toBe(16)
  })

  it('应该正确组合异步函数', async () => {
    const add = async x => x + 1
    const multiply = async x => x * 2

    const composed = compose([add, multiply])
    const result = await composed(5)

    // (5 + 1) * 2 = 12
    expect(result).toBe(12)
  })

  it('应该正确组合同步和异步函数', async () => {
    const add = x => x + 1
    const multiply = async x => x * 2
    const subtract = x => x - 3

    const composed = compose([add, multiply, subtract])
    const result = await composed(5)

    // (5 + 1) * 2 - 3 = 9
    expect(result).toBe(9)
  })

  it('应该处理多次调用时需要复制数组', async () => {
    const add = x => x + 1
    const multiply = x => x * 2

    const list = [add, multiply]
    const composed = compose([...list])
    const result1 = await composed(5)

    expect(result1).toBe(12)

    const composed2 = compose([...list])
    const result2 = await composed2(10)

    expect(result2).toBe(22)
  })

  it('应该处理单个函数的情况', async () => {
    const add = x => x + 1

    const composed = compose([add])
    const result = await composed(5)

    expect(result).toBe(6)
  })

  it('应该处理错误传播', async () => {
    const add = x => x + 1
    const error = () => {
      throw new Error('测试错误')
    }
    const multiply = x => x * 2

    const composed = compose([add, error, multiply])

    await expect(composed(5)).rejects.toThrow('测试错误')
  })
})

```

## 答案

| 类型    | 路径                                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/days/Day 12/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2012/answer.js)       |
| TS 版本 | [problems/days/Day 12/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2012/ts/answer.ts) |
| Review  | [12.md](/review/12)                                                                                                                 |
