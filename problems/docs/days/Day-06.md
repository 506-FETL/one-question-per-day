# Day 06

# 实现一个名为 `myFrom` 的函数

请你实现一个名为 `myFrom` 的函数，该函数模仿原生 ES6 中 `Array.from` 的行为。`myFrom` 接收三个参数：

- **arrayLike**：一个类似数组的对象或可迭代对象（例如：具有 `length` 属性的对象、字符串等）。
- **mapFn** _(可选)_：若提供，则应为一个函数，用于对每个元素进行映射，如果存在则对每个元素执行 `mapFn(element, index)`，并将返回结果插入新数组。
- **thisArg** _(可选)_：若 `mapFn` 存在且 `thisArg` 被提供，则调用映射函数时用 `thisArg` 作为 `this` 的值。

此外，你需要实现两个辅助函数：

1. **toInteger(value)**：转换 `value` 为数值类型，如果不能转换则返回 `0`；对正负数取绝对值并向下取整，再根据原始符号返回结果。
2. **toLength(value)**：保证 `value` 转换成整数后位于合法范围 [0, Number.MAX_SAFE_INTEGER] 内（`Number.MAX_SAFE_INTEGER` 等于 2^53 - 1）。

## 题目要求

1. **输入验证**

   - 当 `arrayLike` 为 `null` 或 `undefined` 时，抛出 `TypeError` 异常，提示 `"Array.from requires an array-like object - not null or undefined"`。
   - 当提供了 `mapFn` 参数，但其类型不是函数时，抛出 `TypeError` 异常，提示 `"Array.from when provided mapFn must be a function"`。

2. **辅助函数**

   - 实现 `toInteger(value)`，将传入值转换为数值，并按照要求返回整数。要求对 `NaN` 返回 `0`，对无穷大或 0 直接返回其值，否则返回带符号的向下取整结果。
   - 实现 `toLength(value)`，利用 `toInteger` 保证返回值在 `[0, Number.MAX_SAFE_INTEGER]` 之间。

3. **数组转换**

   - 使用 `Object(arrayLike)` 获取输入的对象副本，并通过 `toLength` 得到合法的长度，创建一个新的数组（或数组状对象）。
   - 遍历 `arrayLike` 每个索引的位置，对于每个元素：
     - 如果存在 `mapFn`，则：
       - 当 `thisArg` 被提供，以 `thisArg` 作为 `this` 调用 `mapFn(iValue, i)`；
       - 否则直接调用 `mapFn(iValue, i)`。
     - 如果不传入 `mapFn`，则直接将原始元素复制到新数组中。
   - 最终返回新生成的数组。

4. **示例和测试要求**
   - 输入：`myFrom({0: 'a', 1: 'b', length: 2})` 应返回 `['a', 'b']`。
   - 输入：`myFrom('hello')` 应返回 `['h', 'e', 'l', 'l', 'o']`。
   - 输入：
     ```js
     function addIndex(el, i) {
       return el + i;
     }
     myFrom({ 0: "a", 1: "b", length: 2 }, addIndex);
     ```
     应返回 `['a0', 'b1']`。
   - 输入：若 `mapFn` 存在但其类型不是函数，则抛出相应错误。

## 代码

| 类型    | 路径                                   |
| ------- | -------------------------------------- |
| JS 答案 | problems/days/Day 06/answer.js         |
| TS 答案 | problems/days/Day 06/ts/answer.ts      |
| 模板    | problems/days/Day 06/ts/myFrom.ts      |
| 测试    | problems/days/Day 06/ts/myFrom.spec.ts |
