/**
 * @param {any} input
 * @returns {true | false}
 */
export default function myExpect(input) {
  let flag = false
  return {
    toBe: function toBe(expect) {
      const result = Object.is(expect, input)
      return flag ? !result : result
    },
    get not() {
      flag = !flag
      return this
    },
  }
}
