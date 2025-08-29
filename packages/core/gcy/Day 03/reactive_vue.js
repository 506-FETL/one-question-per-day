// 当前正在执行的副作用函数（用来依赖收集）
let activeEffect = null

// 依赖收集桶（结构见上面）
const bucket = new WeakMap()

// 注册副作用函数
export function effect(fn) {
  activeEffect = fn // 暂存当前副作用函数
  fn() // 立即执行一次，进行依赖收集
  activeEffect = null // 执行完毕，清空
}

// 创建响应式对象
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 1. 如果当前有副作用函数在执行，则进行依赖收集
      if (activeEffect) {
        // 获取 target 对应的 Map，没有就创建
        let depsMap = bucket.get(target)
        if (!depsMap) {
          depsMap = new Map()
          bucket.set(target, depsMap)
        }

        // 获取 key 对应的 Set，没有就创建
        let deps = depsMap.get(key)
        if (!deps) {
          deps = new Set()
          depsMap.set(key, deps)
        }

        // 把当前副作用函数加入 Set
        deps.add(activeEffect)
      }

      // 2. 返回实际值
      return Reflect.get(target, key)
    },

    set(target, key, value) {
      // 设置属性值
      const result = Reflect.set(target, key, value)

      // 取出依赖这个 key 的副作用函数并执行
      const depsMap = bucket.get(target)
      if (depsMap) {
        const deps = depsMap.get(key)
        if (deps) {
          deps.forEach(fn => fn())
        }
      }

      return result
    },
  })
}
