### 题目描述

#### 实现一个 深拷贝

- 要求:能够解决循环嵌套对象的深拷贝函数

```js
// 测试代码
const a = { name: 'Alice' }
a.self = a // 循环引用

const b = deepClone(a)
console.log(b) // 输出: { name: 'Alice', self: [Circular] }
/*
console.log 的输出结果中包含 [Circular] 是因为 JavaScript 的控制台会检测到对象中的循环引用，并用这个标记来表示，避免陷入无限循环。
事实上，我们的 deepClone 函数并不会在实际对象数据结构中插入 [Circular] 这类标记，它只是一个视觉化的提示，帮助我们理解输出结果。
 */
```
