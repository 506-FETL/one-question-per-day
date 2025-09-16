import type { SumFunction, SumWrapper } from './types'

/**
 * @param v 传入的值
 */
const sum: SumFunction = (v = 0) => {
  const wrapper = ((newArg = 0) => {
    return sum(v + newArg)
  }) as SumWrapper

  wrapper[Symbol.toPrimitive] = () => v

  return wrapper
}

export default sum
