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
  const isCallable = (fn) =>
    typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]'
  const toInteger = (v) => {
    const _v = Number(v)
    if (isNaN(_v)) return 0
    if (v === 0 || !isFinite(_v)) return _v

    return (_v > 0 ? 1 : -1) * Math.floor(Math.abs(_v))
  }

  const maxSafeInteger = Number.MAX_SAFE_INTEGER
  const toLength = (v) => {
    const n = toInteger(v)
    if (n > maxSafeInteger) throw new RangeError('length exceeds MAX_SAFE_INTEGER')

    return Math.max(0, n)
  }

  if (arrayLike == null)
    throw new TypeError(
      `provided arrayLike must be an array-like object - not null/undefined`
    )

  const items =
    arrayLike instanceof Set || arrayLike instanceof Map
      ? [...arrayLike]
      : Object(arrayLike)

  if (typeof mapFn !== 'undefined') {
    if (!isCallable(mapFn)) throw new TypeError(`provided mapFn must be a function`)
  }

  const len = toLength(items.length)
  const arr = new Array(len)

  let i = 0,
    current

  while (i < len) {
    current = items[i]

    if (mapFn) {
      arr[i] =
        typeof thisArg === 'undefined'
          ? mapFn(current, i)
          : mapFn.call(thisArg, current, i)
    } else {
      arr[i] = current
    }
    i += 1
  }

  arr.length = len
  return arr
}
