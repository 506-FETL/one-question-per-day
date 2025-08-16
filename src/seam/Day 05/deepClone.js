const isObject = v => Object.prototype.toString.call(v) === '[object Object]'

/**
 * 深拷贝一个对象或数组。
 *
 * @param {any} obj - 要深拷贝的对象或数组。
 * @param {Map} [cache] - 用于存储已拷贝对象的缓存，防止循环引用。
 * @returns {any} 返回深拷贝后的对象或数组。
 */
export default function deepClone(obj, cache = new Map()) {
  let result = null

  if (Array.isArray(obj)) {
    result = handleArray(obj, cache)
  }
  else if (isObject(obj)) {
    result = handleObject(obj, cache)
  }
  else {
    result = handleBasic(obj)
  }

  return result
}

function handleArray(arr, cache) {
  const tmp = []

  arr.forEach((el, idx) => {
    switchToHandle(el, tmp, idx, cache)
  })

  return tmp
}

function handleObject(obj, cache) {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const tmp = {}
  cache.set(obj, tmp)

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    switchToHandle(value, tmp, key, cache)
  })

  Object.getOwnPropertySymbols(obj).forEach((sym) => {
    const value = obj[sym]

    switchToHandle(value, tmp, sym, cache)
  })

  return tmp
}

function handleBasic(obj) {
  if (typeof obj === 'symbol') {
    return Symbol(obj.description)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  return obj
}

function switchToHandle(el, tmp, idx, cache) {
  if (isObject(el)) {
    tmp[idx] = handleObject(el, cache)
  }
  else if (Array.isArray(el)) {
    tmp[idx] = handleArray(el, cache)
  }
  else {
    tmp[idx] = handleBasic(el)
  }
}
