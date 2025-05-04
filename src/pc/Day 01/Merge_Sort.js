/**
 * @param {number[]} arr
 *
 * 手写[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)
 * 请直接修改传入的数组，不要返回新数组。
 *
 * 追问
 * 时间空间复杂度是多少？是否是稳定的排序？
 * ✋包是稳定的✋
 */
export default function mergeSort(arr) {
  let res = arr

  function concatSortedArr(arrLeft, arrRight) {
    if (typeof arrLeft === 'number') {
      arrLeft = [arrLeft]
    }
    if (typeof arrRight === 'number') {
      arrRight = [arrRight]
    }
    let resArr = []
    let left = 0
    let right = 0
    while (left < arrLeft.length && right < arrRight.length) {
      if (arrLeft[left] < arrRight[right]) {
        resArr.push(arrLeft[left])
        left++
      } else {
        resArr.push(arrRight[right])
        right++
      }
    }
    while (right < arrRight.length) {
      resArr.push(arrRight[right])
      right++
    }
    while (left < arrLeft.length) {
      resArr.push(arrLeft[left])
      left++
    }
    return resArr
  }
  function catArr(arr) {
    let alternate = 1
    let pendingArr = []
    let resArr = []
    arr.forEach((element) => {
      if (alternate % 2) {
        pendingArr = element
      } else {
        resArr.push(concatSortedArr(pendingArr, element))
        pendingArr = []
      }
      alternate++
    })
    if (alternate % 2 === 0) {
      resArr.push(concatSortedArr(pendingArr, []))
    }
    return resArr
  }
  if (!res.length) {
    arr.slice(0)
    return
  }
  if (res.length === 1) {
    arr.splice(0, arr.length, res[0])
    return
  }
  while (res.length !== 1) {
    res = catArr(res)
  }
  arr.splice(0, arr.length, ...res[0])
  return res[0]
}
