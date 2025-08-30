### 编程题目：实现一个简化版的 Vue 响应式系统

#### 题目描述

在 Vue 中，响应式系统是其最核心的特性之一。Vue 通过追踪数据的依赖，并在数据变更时通知更新，实现了组件的自动刷新。
请你模拟实现 Vue 的响应式系统中的一个简化版本 —— reactive 和 effect

具体要求如下：

1. 实现一个函数 reactive(obj)，将一个普通的对象变成响应式对象
2. 实现一个函数 effect(fn)，接收一个回调函数 fn，当响应式对象中的属性发生改变时，自动重新执行 fn。

#### 函数签名

```javascript
/**
 * 创建响应式对象
 * @param {object} obj - 需要变成响应式的对象
 * @returns {Proxy} 响应式对象
 */
function reactive(obj) {
  // 实现内容
}

/**
 * 注册副作用函数，当响应式数据变化时触发它
 * @param {Function} fn - 依赖响应式数据的函数
 */
function effect(fn) {
  // 实现内容
}
```

#### 示例

```javascript
const user = reactive({ name: 'Tom', age: 20 })

effect(() => {
  console.log('Name is', user.name)
})

user.name = 'Jerry'
// 输出：Name is Jerry
```

#### 提示

使用 Proxy 对对象进行代理，拦截 get 和 set。

在 get 时记录依赖（即当前 effect 函数）。

在 set 时触发依赖（即重新运行相关 effect 函数）。

可以使用一个 Map（依赖桶）来存储对象属性和对应的 effect。

#### 进阶

- 支持嵌套对象的响应式（state.nested.value = 1）
- 支持清除副作用（例如 stop(effectFn)）
- 支持多个 effect 并且能独立追踪不同属性
