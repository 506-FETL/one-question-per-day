let reactiveStack = new WeakMap()
let activateFn = null
/**
 * 创建响应式对象
 * @param {Object} obj - 需要变成响应式的对象
 * @returns {Proxy} 响应式对象
 */
export function reactive(obj) {
  // 实现内容
  return new Proxy(obj, {
    get(target, key) {
      let effects = getEffects(target, key)
      if (activateFn) {
        effects.push(activateFn)
        reactiveStack.get(target).set(key, effects)
      }
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      let effects = getEffects(target, key)
      const result = Reflect.set(target, key, value)
      effects.forEach((effect) => {
        effect()
      })
      return result
    },
  })
}

export function getEffects(obj, key) {
  let keys = reactiveStack.get(obj)
  if (keys == null) {
    keys = new Map()
    reactiveStack.set(obj, keys)
  }
  let effects = keys.get(key)
  if (effects == null) {
    effects = []
    keys.set(key, effects)
  }
  return effects
}
/**
 * 注册副作用函数，当响应式数据变化时触发它
 * @param {Function} fn - 依赖响应式数据的函数
 */
export function effect(fn) {
  activateFn = fn
  fn()
  activateFn = null
}
