export default function createCounter() {
  return new Proxy(
    {},
    {
      get(t, p, r) {
        if (p === 'count')
          t.count = t.count === undefined ? 0 : t.count + 1

        return Reflect.get(t, p, r)
      },
      set(t, p, n, r) {
        if (p !== 'count')
          return Reflect.set(t, p, n, r)
      },
    },
  )
}
