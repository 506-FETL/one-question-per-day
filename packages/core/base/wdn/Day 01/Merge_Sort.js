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
  const l = 0
  const r = arr.length - 1
  function merge(arr, l, r) {
    if (l >= r)
      return
    const mid = (l + r) >> 1
    merge(arr, l, mid)
    merge(arr, mid + 1, r)

    let i = l
    let j = mid + 1
    const temp = []
    while (i <= mid && j <= r) {
      if (arr[i] < arr[j])
        temp.push(arr[i++])
      else temp.push(arr[j++])
    }
    while (i <= mid) temp.push(arr[i++])
    while (j <= r) temp.push(arr[j++])
    for (let i = l, j = 0; i <= r; i++, j++) {
      arr[i] = temp[j]
    }
  }
  merge(arr, l, r)
}
