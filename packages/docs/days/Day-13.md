---
tags: [Proxy,ToPrimitive]
difficulty: medium
---

# Day 13

# add

实现一个 add 要求能达到以下效果：

```js
const value = add[100] + 1
console.log(value) // 101
console.log(value[200][300] + 100) // 701
console.log(add[100][200][300] - 300) // 300
```

## 需求细化

目标是实现一个“可通过连续下标访问累加，并在最终与普通算术运算符（`+ - * /` 等）交互时给出数值结果”的对象 `add`：

- 访问任意数字属性（如 `add[100]`）应返回一个“可继续链式取数”的同类对象（Proxy 实例）。
- 多次访问的数字需要累加保存（包括负数，如测试中的 `[-100]`）。
- 当对象被参与数值运算、或被隐式转换（如：`Number(value)`、`value + 0`、模板字符串插值）时，需要返回累加和。
- 不能污染全局，也不要使用外部可变全局变量记录状态（要求封装）。
- 访问未提供数字（例如直接 `add + 1`）时，若之前没有链式数字，应视为 0。

## 难点 / 考察点

1. 拦截属性访问并对“数字 key”做解析与累加。
2. 如何在“继续链式”与“最终求值”之间区分：JS 对象到原始值转换流程（`ToPrimitive` / `@@toPrimitive` / `valueOf` / `toString`）。
3. 让每次下标返回“同一个逻辑容器”的同时保持内部和可变（闭包 / Proxy 捕获）。
4. 处理正负数：属性名是字符串，需要转为数字再加入；无效 key（非合法数字）应忽略还是抛错？（可在题解中说明自己的策略）。
5. 避免在链条中无意触发提前求值（例如调试输出 console.log 也会尝试调用 `toString`）。

## 实现提示

你可以从以下思路中任选一种或结合：

1. Proxy + 递归返回：

- 使用一个闭包变量 `sum` 保存累计值。
- `get(target, prop)`：若 `prop` 可解析成数字，更新 `sum` 后返回同一 Proxy；否则返回正常属性或 Reflect.get。
- 覆盖 `valueOf` / `toString` / 定义 `Symbol.toPrimitive`，返回 `sum`。

2. 函数可调用包装：把内部结构设计成函数对象，再在 Proxy 中既处理属性访问又允许调用（本题暂不需要调用，但可扩展）。
3. Immutable 风格：每次访问返回一个全新 Proxy，内部携带新的 sum（更纯函数，但多实例）。

推荐方案：单实例 + 闭包 sum + Proxy 拦截，最简且内存常量级。

## 常见陷阱

| 问题                                    | 说明                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| 直接在对象字面量上写 `valueOf` 但被覆盖 | 需确保返回数字；别返回对象再陷入递归                                           |
| 只实现 `toString`                       | 与 `+` 运算时可能触发 `valueOf` 优先级差异，建议实现 `Symbol.toPrimitive` 更稳 |
| 属性 key 解析错误                       | `Number('')` / `Number('  ')` / `Number('0x11')` 等边界要不要接受需明确        |
| 负号处理                                | `add[-100]` 中 `prop` 字符串为 `-100`，直接 `Number(prop)` 即可                |
| sum 溢出                                | 正常题目不要求 bigint，但可在扩展中提及                                        |

## 进阶可选扩展（可在做完基础版后尝试）

- 支持函数调用形式：`add(100)(200) + 300`。
- 支持混合：`add[100](200)[300] - 50`。
- 支持 `.value()` 或 `.sum()` 显式取值。
- 支持重置：`add.reset()[100] + 1`。
- 支持自定义初始值：`add.start(100)[50] + 50`。
- 支持 BigInt：`add[10n][20n] + 30n`。

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

| 类型    | 路径                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 13/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/packages/problems/base/Day%2013/answer.js) |
| Review  | [13.md](/review/13)                                                                                                               |
