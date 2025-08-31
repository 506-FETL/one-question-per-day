interface ExpectResult<T> {
  toBe: (checker: T) => boolean
  readonly not: ExpectResult<T>
}

export default function myExpect<T>(input: T): ExpectResult<T> {
  let isReserved = false

  return {
    toBe<K>(checker: K) {
      const isEqual = Object.is(input, checker)
      if ((isReserved && isEqual) || (!isReserved && !isEqual))
        return false
      else return true
    },
    get not() {
      isReserved = !isReserved
      return this
    },
  }
}
