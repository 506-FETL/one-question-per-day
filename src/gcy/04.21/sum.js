/**
 * @param {number} v 传入的值
 */
export default function sum(v = 0) {
  function createF(nextTotal){
    function f(next=0){
      return createF(nextTotal + next)
    }
    f.valueOf=()=>nextTotal
    return f
  }
  return createF(v)
}
 

