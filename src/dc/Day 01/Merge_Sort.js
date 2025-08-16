/**
 * @param {number[]} arr
 *
 * 手写[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
 * 请直接修改传入的数组，不要返回新数组。
 *
 * 追问
 * 时间空间复杂度是多少？是否是稳定的排序？
 */

function resolve(arr, left, right) {
  if (left < right) {
    const mid = (left + right) >> 1

    resolve(arr, left, mid)

    resolve(arr, mid + 1, right)

    merge(arr, left, mid, right)
  }
}

function merge(arr, left, mid, right) {
  const temp = []
  let posl = left
  let posr = mid + 1
  let low = left

  while (posl <= mid && posr <= right) {
    if (arr[posl] < arr[posr])
      temp[left++] = arr[posl++]
    else temp[left++] = arr[posr++]
  }

  while (posl <= mid) {
    temp[left++] = arr[posl++]
  }

  while (posr <= right) {
    temp[left++] = arr[posr++]
  }

  while (low <= right) {
    arr[low] = temp[low]
    low++
  }
}

export default function mergeSort(arr) {
  resolve(arr, 0, arr.length - 1)
}

mergeSort([12, 22, 1, 33, 12, 98, 22, 4])
