export default function sum(base = 0) {
  const cb = (arg = 0) => {
    return sum(base + arg)
  }
  cb.valueOf = () => base
  return cb
}
