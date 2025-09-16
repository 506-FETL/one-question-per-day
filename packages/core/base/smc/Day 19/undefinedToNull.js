export default function undefinedToNull(arg) {
  return convertToNull(arg, new WeakMap())
}

function isPlainObject(val) {
  if (val === null || typeof val !== 'object')
    return false
  return Object.prototype.toString.call(val) === '[object Object]'
}

function convertToNull(arg, seen) {
  if (arg === undefined)
    return null
  if (Array.isArray(arg))
    return handleArray(arg, seen)
  if (arg instanceof Map)
    return handleMap(arg, seen)
  if (arg instanceof Set)
    return handleSet(arg, seen)
  if (isPlainObject(arg))
    return handleObject(arg, seen)
  return arg
}

function handleArray(arr, seen) {
  if (seen.has(arr))
    return seen.get(arr)
  const clone = new Array(arr.length)
  seen.set(arr, clone)
  for (let i = 0; i < arr.length; i++) {
    if (Object.prototype.hasOwnProperty.call(arr, i)) {
      clone[i] = convertToNull(arr[i], seen)
    }
  }
  return clone
}

function handleObject(obj, seen) {
  if (seen.has(obj))
    return seen.get(obj)
  const clone = {}
  seen.set(obj, clone)
  for (const key of Reflect.ownKeys(obj)) {
    const desc = Object.getOwnPropertyDescriptor(obj, key)
    if (desc && desc.enumerable) {
      clone[key] = convertToNull(obj[key], seen)
    }
  }
  return clone
}

function handleMap(map, seen) {
  if (seen.has(map))
    return seen.get(map)
  const clone = new Map()
  seen.set(map, clone)
  for (const [k, v] of map.entries()) {
    clone.set(k, convertToNull(v, seen))
  }
  return clone
}

function handleSet(set, seen) {
  if (seen.has(set))
    return seen.get(set)
  const clone = new Set()
  seen.set(set, clone)
  for (const v of set.values()) {
    clone.add(convertToNull(v, seen))
  }
  return clone
}
