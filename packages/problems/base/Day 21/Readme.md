# 📌 题目：实现一个带自动重试的 API 请求函数

## 📝 题目描述

在开发 Web 应用时，调取 API 是非常常见的场景。然而，由于网络波动或服务端不稳定，请求可能会失败。常见做法是提示用户错误并提供手动重试按钮。

另一种更友好的方案是：**在遇到错误时自动重试请求，直到达到最大重试次数为止**。

请实现一个函数 `fetchWithAutoRetry(fetcher, maximumRetryCount)`，它会调用传入的 `fetcher` 方法。当 `fetcher` 抛出错误（即返回 rejected Promise）时，会自动重试，直到达到最大次数或者请求成功。

题目中，你 **不需要判断错误类型** —— 任何 rejection 都视为“网络错误”并触发重试。

## ✨ 函数签名

```js
/**
 * @param {() => Promise<any>} fetcher - 一个返回 Promise 的函数，代表一次 API 调用
 * @param {number} maximumRetryCount - 最大重试次数
 * @return {Promise<any>} - 最终请求结果，如果超过最大重试次数仍然失败，则返回最后的错误
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // TODO: 实现
}
```

## 🔍 示例

### 示例 1：成功请求

```js
let attempt = 0
const fetcher = () => {
  attempt++
  return Promise.resolve('ok')
}

fetchWithAutoRetry(fetcher, 3).then(console.log)
// 输出: 'ok'
```

### 示例 2：失败后成功

```js
let attempt = 0
const fetcher = () => {
  attempt++
  if (attempt < 3) return Promise.reject('network error')
  return Promise.resolve('ok')
}

fetchWithAutoRetry(fetcher, 5).then(console.log)
// 输出: 'ok'
// （前两次失败，第三次成功）
```

### 示例 3：超过最大重试次数

```js
let attempt = 0
const fetcher = () => {
  attempt++
  return Promise.reject('always fail')
}

fetchWithAutoRetry(fetcher, 2).catch(console.error)
// 输出: 'always fail'
// （尝试了 3 次：初始 1 次 + 重试 2 次）
```
