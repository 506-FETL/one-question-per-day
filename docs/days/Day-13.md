---
tags: [Proxy,ToPrimitive]
difficulty: medium
---

# Day 13

# add

实现一个 add 要求能达到一下效果：

```js
const value = add[100] + 1;
console.log(value); // 101
console.log(value[200][300] + 100); // 701
console.log(add[100][200][300] - 300); // 300
```

## 题目模版

```js
// free to code

const add = null

export default add
```

## 测试代码

```js
import { describe, expect, it } from 'vitest'
import add from './add'

describe('day 13 -- add', () => {
  it('应该正常简单相加', () => {
    const result = add[100]
    expect(result + 1).toBe(101)
  })

  it('应该能连续调用', () => {
    expect(add[100][200] + 100).toBe(400)
  })

  it('应该能保存状态', () => {
    const foo = add[100]
    const result = foo[200]

    expect(foo + 200).toBe(300)
    expect(result[-100] - 100).toBe(100)
    expect(result - 200).toBe(100)
  })
})

```

## 答案

| 类型    | 路径                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 13/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2013/answer.js)       |
| TS 版本 | [problems/Day 13/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2013/ts/answer.ts) |
| Review  | [13.md](/review/13)                                                                                                       |
