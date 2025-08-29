---
tags: [测试,断言]
difficulty: easy
next:
  text: 复盘
  link: review
---

# Day 18

# 模拟 Jest 测试

以下是非常简单的Jest测试代码。

```js
expect(3).toBe(3); // ✅
expect(4).toBe(3); // ❌
```

我们可以通过`not`将其反过来。

```js
expect(3).not.toBe(3); // ❌
expect(4).not.toBe(3); // ✅
```

请实现myExpect()并支持toBe()及not.

**✨ 如果考虑到代码的健壮性，如何避免硬编码？**

## 题目模版

::: code-group

```js [myExpect.js]
/**
 * @param {any} input
 * @returns {true | false}
 */
export default function myExpect(input) {

}
```

```ts [myExpect.ts]
interface ExpectResult<T> {
  toBe: (checker: T) => boolean
  readonly not: ExpectResult<T>
}

export default function myExpect<T>(input: T): ExpectResult<T> {

}
```

:::

## 测试代码

::: code-group

```js [myExpect.spec.js]
import { describe, expect, it } from 'vitest'
import myExpect from './myExpect'

describe('day18-myExpect', () => {
  const theSameObject = {}

  it.each([
    [3, 3, true],
    [1, 1, true],
    [Symbol(1), Symbol(1), false],
    [Symbol.for(1), Symbol.for(1), true],
    [+0, -0, false],
    [{}, {}, false],
    [theSameObject, theSameObject, true],
  ])('myExpect(%s).toBe(%s) 的结果应为 %s', (received, expected, result) => {
    expect(myExpect(received).toBe(expected)).toBe(result)
  })

  it.each([
    [3, 3, false],
    [1, 1, false],
    [Symbol(1), Symbol(1), true],
    [Symbol.for(1), Symbol.for(1), false],
    [{}, {}, true],
    [theSameObject, theSameObject, false],
  ])(
    'myExpect(%s).not.toBe(%s) 的结果应为 %s',
    (received, expected, result) => {
      expect(myExpect(received).not.toBe(expected)).toBe(result)
    },
  )
})

```

```ts [myExpect.spec.ts]
import { describe, expect, it } from 'vitest'
import myExpect from './myExpect'

describe('day18-myExpect', () => {
  const theSameObject = {}

  it.each([
    [3, 3, true],
    [1, 1, true],
    [Symbol(1), Symbol(1), false],
    [Symbol.for('1'), Symbol.for('1'), true],
    [+0, -0, false],
    [{}, {}, false],
    [theSameObject, theSameObject, true],
  ])('myExpect(%s).toBe(%s) 的结果应为 %s', (received, expected, result) => {
    expect(myExpect(received).toBe(expected)).toBe(result)
  })

  it.each([
    [3, 3, false],
    [1, 1, false],
    [Symbol(1), Symbol(1), true],
    [+0, -0, true],
    [Symbol.for('1'), Symbol.for('1'), false],
    [{}, {}, true],
    [theSameObject, theSameObject, false],
  ])(
    'myExpect(%s).not.toBe(%s) 的结果应为 %s',
    (received, expected, result) => {
      expect(myExpect(received).not.toBe(expected)).toBe(result)
    },
  )
})
```

:::

## 答案

| 类型    | 路径                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 18/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2018/answer.js)       |
| TS 版本 | [problems/Day 18/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2018/ts/answer.ts) |
| Review  | [18.md](/review/18)                                                                                                       |
