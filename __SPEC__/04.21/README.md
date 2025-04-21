# 实现一个 sum()，使得如下判断成立。

```js
const sum1 = sum(1)
const _sum = sum()

sum1 == 1 // true
_sum == 0 // true

sum1(2) == 3 // true
sum1(3) == 4 // true

sum(1)(2)(3) == 6 // true
sum(5)(-1)(2) == 6 // true
sum(1)(2)() == 3 // true
sum(1)()(2) == 3 // true
```

- 注意是 `==` 而不是 `===`
- 可以连续调用
- 如果不传入参数，默认为 0
