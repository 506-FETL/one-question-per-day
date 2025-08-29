export default function deduplicate<T>(arr: T[]) {
  const uniqueElements: T[] = []

  arr.forEach((el) => {
    if (!uniqueElements.includes(el))
      uniqueElements.push(el)
  })

  uniqueElements.forEach((el, idx) => {
    arr[idx] = el
  })
  // 如果是稀疏数组，保留一个空位
  arr.length = isSparse(arr)
    ? uniqueElements.length + 1
    : uniqueElements.length
}

function isSparse<T>(arr: T[]) {
  return Object.keys(arr).length < arr.length
}
