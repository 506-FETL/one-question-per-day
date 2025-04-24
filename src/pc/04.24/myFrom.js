/**
 * 自定义实现 Array.from 方法，将类数组对象或可迭代对象转换为数组。
 *
 * @param {ArrayLike|Iterable} arrayLike - 类数组对象或可迭代对象。
 * @param {Function} [mapFn] - 可选的映射函数，用于对每个元素进行处理。
 * @param {*} [thisArg] - 可选的上下文对象，用于绑定 `mapFn` 的 `this` 值。
 * @returns {Array} 返回一个新数组，包含从 `arrayLike` 转换而来的元素。
 * @throws {TypeError} 如果 `arrayLike` 为 null 或 undefined，抛出类型错误。
 * @throws {TypeError} 如果提供的 `mapFn` 不是函数，抛出类型错误。
 */
export default function myFrom(arrayLike, mapFn, thisArg) {
  const arr = []
  const isArr = Array.isArray(arrayLike)
  const isArrLike = isArrayLike(arrayLike) && !isArr
  const isIterable = Boolean(arrayLike[Symbol.iterator])
  if (arrayLike == null || (mapFn && typeof mapFn !== 'function'))
    throw new TypeError('告诉你坝你的类型对吗?')

  if (!isArr && !isArrLike && !isIterable) return []

  if (mapFn && thisArg) {
    mapFn = mapFn.bind(thisArg)
  }

  let index = 0
  if (isArrLike || isArr) {
    if (arrayLike.length > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('too long')
    }
    for (; index < arrayLike.length; index++) {
      if (!mapFn) arr[index] = arrayLike[index]
      else arr[index] = mapFn(arrayLike[index], index)
    }
  } else if (isIterable) {
    for (let value of arrayLike) {
      if (!mapFn) arr[index++] = value
      else arr[index] = mapFn(arrayLike[index], index++)
    }
  }
  return arr
}
const isArrayLike = (obj) => {
  if (
    (typeof obj === 'object' || typeof obj === 'string') &&
    obj.length &&
    obj.length >= 0 &&
    isFinite(obj.length)
  ) {
    return true
  }
  return false
}
