### 编程题目：将生成器函数转换为异步函数

#### 题目描述

在 JavaScript 中，生成器函数可以通过 `yield` 暂停执行，并在后续调用 `next` 方法时继续执行。现在，请你实现一个函数 `generatorToAsync`，它可以将一个生成器函数转换为一个异步函数，使得生成器函数中的 `yield` 可以自动处理异步操作（如 `Promise`）。

具体要求如下：

1. 输入是一个生成器函数 `func`。
2. 输出是一个异步函数，调用该函数时会自动执行生成器函数，并依次处理 `yield` 返回的值。
3. 如果 `yield` 返回的是一个 `Promise`，需要等待其完成后再继续执行生成器。
4. 如果 `yield` 返回的是普通值，则直接继续执行生成器。
5. 如果生成器函数执行过程中抛出错误，异步函数需要返回一个被拒绝的 `Promise`。

#### 函数签名

```javascript
/**
 * 将生成器函数转换为异步函数。
 *
 * @param {() => Generator<any, any, any>} func - 一个生成器函数。
 * @returns {Function} 一个返回 Promise 的异步函数。
 * @throws {TypeError} 如果传入的参数不是生成器函数。
 */
function generatorToAsync(func) {
  // 请在此处实现
}
```

#### 示例

```javascript
// 示例 1：处理异步操作
function* generatorFunction() {
  const value1 = yield Promise.resolve(1)
  const value2 = yield Promise.resolve(value1 + 1)
  return value2 + 1
}

const asyncFunction = generatorToAsync(generatorFunction)
asyncFunction().then(console.log) // 输出 3

// 示例 2：处理同步值
function* generatorFunctionSync() {
  const value1 = yield 1
  const value2 = yield value1 + 1
  return value2 + 1
}

const asyncFunctionSync = generatorToAsync(generatorFunctionSync)
asyncFunctionSync().then(console.log) // 输出 3

// 示例 3：处理错误
function* generatorFunctionError() {
  yield Promise.reject(new Error('Test error'))
}

const asyncFunctionError = generatorToAsync(generatorFunctionError)
asyncFunctionError().catch((err) => console.error(err.message)) // 输出 "Test error"
```

#### 提示

1. 你可以通过调用生成器函数 `func()` 获取生成器对象。
2. 使用生成器对象的 `next` 方法可以获取当前 `yield` 的值。
3. 使用 `Promise` 来封装异步逻辑，确保返回值是一个 `Promise`。

#### 进阶

- 考虑如何验证传入的 `func` 是否是一个生成器函数。
- 优化代码结构，使其更易读和易维护。
