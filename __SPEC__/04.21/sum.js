/**
 * @param {number} v 传入的值
 */
export default function sum(v = 0) {
  function wrapper(newArg = 0) {
    return sum(v + newArg)
  }

  wrapper[Symbol.toPrimitive] = () => v

  return wrapper
}
