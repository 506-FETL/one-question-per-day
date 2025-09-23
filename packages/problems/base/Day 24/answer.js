/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {{leading: boolean, trailing:boolean}} option
 * @returns {(...args: any[]) => any} func
 */
export default function throttle(func, wait, option = { leading: true, trailing: true }) {
  const { leading, trailing } = option
  let savedArgs = null
  let savedThis = null
  let timer = null

  function setTimer() {
    if (savedArgs && trailing) {
      func.apply(savedThis, savedArgs)
      savedArgs = savedThis = null
      timer = setTimeout(setTimer, wait)
    }
    else {
      timer = null
    }
  }

  return function (...args) {
    if (!timer) {
      if (leading)
        func.apply(this, args)
      timer = setTimeout(setTimer, wait)
    }
    else {
      savedArgs = args
      savedThis = this
    }
  }
}
