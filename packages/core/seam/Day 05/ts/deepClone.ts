type Cache = Map<object, any>
type PlainObject = Record<PropertyKey, any>

function isObject(v: unknown): v is PlainObject {
  return Object.prototype.toString.call(v) === '[object Object]'
}

/**
 * 深拷贝一个对象或数组。
 *
 * @param obj - 要深拷贝的对象或数组。
 * @param cache - 用于存储已拷贝对象的缓存，防止循环引用。
 * @returns 返回深拷贝后的对象或数组。
 */
export default function deepClone<T>(obj: T, cache: Cache = new Map()): T {
  let result: any = null

  if (Array.isArray(obj)) {
    result = handleArray(obj, cache)
  }
  else if (isObject(obj)) {
    result = handleObject(obj, cache)
  }
  else {
    result = handleBasic(obj)
  }

  return result as T
}

function handleArray(arr: any[], cache: Cache): any[] {
  const tmp: any[] = []

  arr.forEach((el: any, idx: number) => {
    switchToHandle(el, tmp, idx, cache)
  })

  return tmp
}

function handleObject(obj: PlainObject, cache: Cache): PlainObject {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const tmp: PlainObject = {}
  cache.set(obj, tmp)

  Object.keys(obj).forEach((key: string) => {
    const value = obj[key]
    switchToHandle(value, tmp, key, cache)
  })

  Object.getOwnPropertySymbols(obj).forEach((sym: symbol) => {
    const value = obj[sym]
    switchToHandle(value, tmp, sym, cache)
  })

  return tmp
}

function handleBasic(obj: any): any {
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

function switchToHandle(
  el: any,
  tmp: any[] | PlainObject,
  idx: PropertyKey,
  cache: Cache,
): void {
  if (isObject(el)) {
    (tmp as any)[idx] = handleObject(el, cache)
  }
  else if (Array.isArray(el)) {
    (tmp as any)[idx] = handleArray(el, cache)
  }
  else {
    (tmp as any)[idx] = handleBasic(el)
  }
}
