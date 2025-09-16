/**
 * @param {any[]} arr
 */
export default function deduplicate(arr) {
  const uniqueElements = []

  arr.forEach((el) => {
    if (!uniqueElements.includes(el))
      uniqueElements.push(el)
  })

  uniqueElements.forEach((el, idx) => {
    arr[idx] = el
  })
  arr.length = isSparse(arr)
    ? uniqueElements.length + 1
    : uniqueElements.length
}

function isSparse(arr) {
  return Object.keys(arr).length < arr.length
}
