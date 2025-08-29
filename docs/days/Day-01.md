---
tags: [排序,分治]
difficulty: easy
prev:
  text: 题目目录
  link: days
---

# Day 01

# 🎉实现一个 js 版本的归并排序

## 题目模版

::: code-group

```js [mergeSort.js]
/**
 * @param {number[]} arr
 *
 * 手写[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
 * 请直接修改传入的数组，不要返回新数组。
 *
 * 追问
 * 时间空间复杂度是多少？是否是稳定的排序？
 */
export default function mergeSort(arr) {}
```

```ts [mergeSort.ts]
/**
 * 手写[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
 * 请直接修改传入的数组，不要返回新数组。
 *
 * 追问
 * 时间空间复杂度是多少？是否是稳定的排序？
 */
function mergeSort(arr: number[]): number[] {

}

export default mergeSort
```

:::

## 测试代码

::: code-group

```js [Merge_Sort.spec.js]
import { describe, expect, it } from 'vitest'
import mergeSort from './Merge_Sort'

describe('4.16.default--手写归并排序', () => {
  it('应排序一个正整数数组', () => {
    const arr = [5, 2, 9, 1, 5, 6]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 5, 5, 6, 9])
  })

  it('应排序包含负整数的数组', () => {
    const arr = [-3, -1, -7, -4, -5]
    mergeSort(arr)
    expect(arr).toEqual([-7, -5, -4, -3, -1])
  })

  it('应排序包含正负整数的数组', () => {
    const arr = [3, -1, 0, -7, 4, 2]
    mergeSort(arr)
    expect(arr).toEqual([-7, -1, 0, 2, 3, 4])
  })

  it('应处理一个已排序的数组', () => {
    const arr = [1, 2, 3, 4, 5]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('应处理一个逆序排序的数组', () => {
    const arr = [5, 4, 3, 2, 1]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('应处理包含重复元素的数组', () => {
    const arr = [4, 2, 4, 3, 2, 1]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 2, 3, 4, 4])
  })

  it('应处理空数组', () => {
    const arr = []
    mergeSort(arr)
    expect(arr).toEqual([])
  })

  it('应处理一个只有一个元素的数组', () => {
    const arr = [42]
    mergeSort(arr)
    expect(arr).toEqual([42])
  })
})

describe('4.16.seam--手写归并排序', () => {
  it('包含小数、负数情况', () => {
    const arr = [1, 2, 4, 2.3, 4.32, 5, 5, 99, 10, -23]
    const result = [-23, 1, 2, 2.3, 4, 4.32, 5, 5, 10, 99]

    mergeSort(arr)
    expect(arr).toEqual(result)
  })
})

```

```ts [Merge_Sort.spec.ts]
import { describe, expect, it } from 'vitest'
import mergeSort from './Merge_Sort'

describe('4.16.default--手写归并排序', () => {
  it('应排序一个正整数数组', () => {
    const arr = [5, 2, 9, 1, 5, 6]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 5, 5, 6, 9])
  })

  it('应排序包含负整数的数组', () => {
    const arr = [-3, -1, -7, -4, -5]
    mergeSort(arr)
    expect(arr).toEqual([-7, -5, -4, -3, -1])
  })

  it('应排序包含正负整数的数组', () => {
    const arr = [3, -1, 0, -7, 4, 2]
    mergeSort(arr)
    expect(arr).toEqual([-7, -1, 0, 2, 3, 4])
  })

  it('应处理一个已排序的数组', () => {
    const arr = [1, 2, 3, 4, 5]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('应处理一个逆序排序的数组', () => {
    const arr = [5, 4, 3, 2, 1]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('应处理包含重复元素的数组', () => {
    const arr = [4, 2, 4, 3, 2, 1]
    mergeSort(arr)
    expect(arr).toEqual([1, 2, 2, 3, 4, 4])
  })

  it('应处理空数组', () => {
    const arr: number[] = []
    mergeSort(arr)
    expect(arr).toEqual([])
  })

  it('应处理一个只有一个元素的数组', () => {
    const arr = [42]
    mergeSort(arr)
    expect(arr).toEqual([42])
  })
})

describe('4.16.seam--手写归并排序', () => {
  it('包含小数、负数情况', () => {
    const arr = [1, 2, 4, 2.3, 4.32, 5, 5, 99, 10, -23]
    const result = [-23, 1, 2, 2.3, 4, 4.32, 5, 5, 10, 99]

    mergeSort(arr)
    expect(arr).toEqual(result)
  })
})

```

:::

## 答案

| 类型    | 路径                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 01/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2001/answer.js)       |
| TS 版本 | [problems/Day 01/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2001/ts/answer.ts) |
| Review  | [01.md](/review/01)                                                                                                       |
