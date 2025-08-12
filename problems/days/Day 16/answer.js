/**
 * @param {number} num
 * @return {string}
 */
export default function addComma(num) {
  const isNegative = num < 0
  const str = String(Math.abs(num))
  let result = ''

  let [integer, decimal] = str.split('.')

  const fixedInteger = integer
    .split('')
    .reverse()
    .reduce((acc, cur, idx) => {
      let out = acc + cur
      if ((idx + 1) % 3 === 0) {
        out += ','
      }

      return out
    })
    .split('')
    .reverse()
    .join('')

  result = fixedInteger.startsWith(',') ? fixedInteger.slice(1) : fixedInteger
  if (decimal) result += `.${decimal}`
  if (isNegative) result = '-' + result

  return result
}
