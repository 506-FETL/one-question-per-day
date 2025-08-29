# Day 10：手写 call、apply、bind、instanceof 和 new

## 题目描述

请你分别实现以下几个 JavaScript 基础原理相关的方法：

1. **手写 call 方法**
   实现一个自定义的 `Call` 方法，使其能模拟原生 `Function.prototype.call` 的功能。

2. **手写 apply 方法**
   实现一个自定义的 `Apply` 方法，使其能模拟原生 `Function.prototype.apply` 的功能。

3. **手写 bind 方法**
   实现一个自定义的 `Bind` 方法，使其能模拟原生 `Function.prototype.bind` 的功能，并且能正确处理作为构造函数使用的情况。

4. **手写 instanceof 方法**
   实现一个函数 `instanceOf(obj, Fn)`，判断 `obj` 是否为构造函数 `Fn` 的实例，模拟原生 `instanceof` 运算符的行为。

5. **手写 new 操作符**
   实现一个函数 `selfNew(Fn, ...args)`，模拟 `new Fn(...args)` 的行为，返回一个新对象，并正确处理构造函数返回对象的情况。

---

## 要求

- 不允许直接使用原生的 `call`、`apply`、`bind`、`instanceof`、`new`。
- 代码需考虑边界情况和兼容性。
- 每个方法请用注释说明实现思路。

---

## 示例

```js
function Person(name) {
  this.name = name;
}
const obj = {};

Person.Call(obj, "Tom");
console.log(obj.name); // 'Tom'

function Animal() {}
const dog = selfNew(Animal);
console.log(instanceOf(dog, Animal)); // true
```
