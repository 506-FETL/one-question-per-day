请创建一个含有属性`count`的object。`count` 的初始值为0，每次取值的时候自增1。

```js
const counter = createCounter()
counter.count // 0
counter.count // 1
counter.count // 2
counter.count = 100 // 无法更改
counter.count // 3
```
