const targetsMap = new WeakMap()
let currentEffect = null

/**
 * 创建响应式对象
 * @param {object} obj - 需要变成响应式的对象
 * @returns {Proxy} 响应式对象
 */
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, p, receiver) {
      const effects = getEffects(target, p)

      if (currentEffect) {
        effects.push(currentEffect)
        targetsMap.get(target).set(p, effects)
      }

      return Reflect.get(target, p, receiver)
    },
    set(target, p, newValue, receiver) {
      const effects = getEffects(target, p)
      const result = Reflect.set(target, p, newValue, receiver)

      effects.forEach(cb => cb())

      return result
    },
  })
}

function getEffects(raw, key) {
  let keys = targetsMap.get(raw)
  if (!keys) {
    keys = new Map()
    targetsMap.set(raw, keys)
  }
  let effects = keys.get(key)
  if (!effects) {
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
  // 实现内容
  currentEffect = fn
  fn()
  currentEffect = null
}
