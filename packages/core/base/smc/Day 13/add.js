function createProxy(value = 0) {
  return new Proxy(
    {},
    {
      get(t, p) {
        if (p === Symbol.toPrimitive) {
          return () => value
        }
        return createProxy(value + Number(p))
      },
    },
  )
}

const add = createProxy()

export default add
