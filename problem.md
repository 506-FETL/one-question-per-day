# 实现一个 深拷贝

- 要求:能够解决循环嵌套对象的深拷贝函数

```js
// 测试代码
const a = { name: 'Alice' }
a.self = a // 循环引用

const b = deepClone(a)
console.log(b) // 输出: { name: 'Alice', self: [Circular] }
```
