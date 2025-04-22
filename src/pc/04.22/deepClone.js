/**
 * @param {object} obj 要被深拷贝的值
 * @param {WeakMap} hash 你猜干什么的
 * @return {object} copy 深拷贝后的对象
 */

export default function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (cache.has(obj)) {
    return cache.get(obj)
  }
  const copy = Array.isArray(obj) ? [] : {}
  cache.set(obj, copy)

  for (let key in obj) {
    let value = obj[key]

    copy[key] = deepClone(value, cache)
  }
  return copy
}
