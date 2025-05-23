// 创建代理包装数组
function proxiedArray(value = 0) {
  return new Proxy([], {
    get(target, prop) {
      target.value = value
      if (prop === Symbol.toPrimitive) {
        return () => target.value
      }
      return proxiedArray(value + parseInt(prop))
    },
    set(target, prop, value) {
      // 拦截数组元素的设置
      target[prop] = value
      return true // 在严格模式下必须返回 true 表示设置成功
    },
  })
}

let add = proxiedArray()

export default add
