/**
 * @param {object} obj 要被深拷贝的值
 * @param {WeakMap} hash 你猜干什么的
 * @return {object} copy 深拷贝后的对象
 */

export default function deepClone(obj, cache = new WeakMap()) {
  if (cache.has(obj)) {
    return cache.get(obj)
  }
  if (obj instanceof Date) {
    const copy = new Date(obj.getTime())
    return copy
  }
  else if (typeof obj === 'symbol') {
    return Symbol(obj.description)
  }
  else if (obj instanceof Map) {
    return new Set(obj)
  }
  else if (obj instanceof Set) {
    return new Set(obj)
  }
  else if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }
  else if (obj instanceof Object && !Array.isArray(obj)) {
    const copy = {}
    cache.set(obj, copy)
    for (const key of Object.getOwnPropertyNames(obj)) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue
      }
      if (typeof obj[key] === 'function') {
        copy[key] = obj[key]
      }
      else if (obj[key] instanceof Object) {
        copy[key] = deepClone(obj[key], cache)
      }
      else {
        copy[key] = obj[key]
      }
    }
    for (const sym of Object.getOwnPropertySymbols(obj)) {
      const value = obj[sym]
      copy[sym] = deepClone(value, cache)
    }
    return copy
  }
  else if (Array.isArray(obj)) {
    const copy = []
    for (let i = 0; i < obj.length; i++) {
      const value = obj[i]
      if (Array.isArray(value) || value instanceof Object) {
        copy[i] = deepClone(value, cache)
      }
      else {
        copy[i] = value
      }
    }
    return copy
  }
  else {
    return obj
  }
}
