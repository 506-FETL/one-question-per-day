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
  let l = 0,
    r = arr.length - 1

  function _merge(arr, l, r) {
    if (l >= r) return
    const mid = (l + r) >> 1

    _merge(arr, l, mid), _merge(arr, mid + 1, r)

    let i = l,
      j = mid + 1
    const tmp = []

    while (i <= mid && j <= r) {
      if (arr[i] < arr[j]) tmp.push(arr[i++])
      else tmp.push(arr[j++])
    }

    while (i <= mid) tmp.push(arr[i++])
    while (j <= r) tmp.push(arr[j++])

    for (let i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j]
  }

  _merge(arr, l, r)
}
