/**
 * @param {object} obj 要被深拷贝的值
 * @param {WeakMap} hash 你猜干什么的
 * @return {object} copy 深拷贝后的对象
 */

export default function deepClone(obj, cache = new Map()) {
  let result = null

  if (Array.isArray(obj)) {
    result = handleArray(obj, cache)
  } else if (isObject(obj)) {
    result = handleObject(obj, cache)
  } else {
    result = handleBasic(obj)
  }

  return result
}

const handleArray = (arr, cache) => {
  let tmp = []

  arr.forEach((el) => {
    tmp.push(deepClone(el, cache))
  })

  return tmp
}

const handleObject = (obj, cache) => {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const tmp = {}
  cache.set(obj, tmp)

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    tmp[key] = deepClone(value, cache)
  })
  Object.getOwnPropertySymbols(obj).forEach((sym) => {
    const value = obj[sym]
    if (typeof value === 'function') {
      tmp[sym] = value.bind(tmp)
    } else {
      tmp[sym] = deepClone(value, cache)
    }
  })
  return tmp
}

const handleBasic = (obj) => {
  if (typeof obj === 'function') {
    return obj
  }

  if (typeof obj === 'symbol') {
    return obj
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  return obj
}

const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]'
