/**
 * @param {any} input
 * @returns {true | false}
 */
export default function myExpect(input) {
  let isReserved = false

  return {
    toBe(checker) {
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
