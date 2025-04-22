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

  const clone = Array.isArray(obj) ? [] : {}
  cache.set(obj, clone)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], cache)
    }
  }

  return clone
}
//当然,你可以自己处理循环引用的对象
// 自定义 JSON.stringy replacer 用于处理循环引用的对象
function safeStringify(obj, replacer = null, space = 2) {
  const cache = new Set()
  const result = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // 出现循环引用时，返回特定字符串
          return '[Circular]'
        }
        cache.add(value)
      }
      return replacer ? replacer(key, value) : value
    },
    space
  )
  cache.clear()
  return result
}
