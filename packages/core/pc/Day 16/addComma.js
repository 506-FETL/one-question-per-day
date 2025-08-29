/**
 * @param {number} num
 * @return {string}
 */

export default function addComma(num) {
  num = `${num}`
  const { code, getWrapperCode } = getCode(num)
  let res = ''
  for (let i = code.length - 1, j = 1; i >= 0; i--, j++) {
    if (j % 3 === 0 && i !== 0) {
      res = `,${code[i]}${res}`
      continue
    }
    res = code[i] + res
  }
  return getWrapperCode(res)
}
function getCode(content) {
  let front = ''
  let end = ''

  function getWrapperCode(code) {
    return front + code + end
  }
  function setFrontAndEnd(code) {
    code = `${code}`
    if (code[0] === '-') {
      front = '-'
      code = code.slice(1)
    }
    const pointLocation = code.indexOf('.')
    if (pointLocation !== -1) {
      end = code.slice(pointLocation)
      code = code.slice(0, pointLocation)
    }
    return code
  }
  const code = setFrontAndEnd(content)
  return {
    code,
    getWrapperCode,
  }
}
