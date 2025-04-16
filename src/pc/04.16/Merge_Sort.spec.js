import { describe, expect, it } from 'vitest'
import mergeSort from './Merge_Sort'

describe('4.16.default--手写归并排序', () => {
  it('应排序一个正整数数组', () => {
    const arr = [5, 2, 9, 1, 5, 6]
    // mergeSort(arr)
    // expect(arr).toEqual([1, 2, 5, 5, 6, 9])
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
