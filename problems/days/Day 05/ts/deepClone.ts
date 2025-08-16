type Cache = Map<object, any>

export default function deepClone<T>(obj: T, cache: Cache = new Map()): T {
  return obj
}
