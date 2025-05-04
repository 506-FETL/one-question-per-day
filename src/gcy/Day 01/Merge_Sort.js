/**
 * @param {number[]} arr
 *
 * 手写[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
 * 请直接修改传入的数组，不要返回新数组。
 *
 * 追问
 * 时间空间复杂度是多少？是否是稳定的排序？
 */
export default function mergeSort(arr) {
  function merge(arr, left, right) {
    let i = 0
    let j = 0
    let k = 0
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      k++
    }
    while (i < left.length) {
      arr[k] = left[i]
      i++
      k++
    }
    while (j < right.length) {
      arr[k] = right[j]
      j++
      k++
    }
  }
  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    mergeSort(left)
    mergeSort(right)
    merge(arr, left, right)
  }
}
