export default function sum(base = 0) {
  const cb = (arg = 0) => {
    return sum(base + arg)
  }
  cb.valueOf = () => base
  return cb
}
let sum1 = sum(1)(2)(3)
console.log(sum1(1)(1) == 8)
console.log(sum1(1)(1) == 8)
