---
tags: [异步,状态机]
difficulty: hard
---

# Day 08

# 自定义实现 Promise

## 题目描述

在 JavaScript 中，Promise 对异步编程的支持非常重要。你的任务是**实现一个与 ES6 原生 Promise 类似的自定义 Promise 类（命名为 `MyPromise`）**。
你需要完成如下功能：

- 状态管理
- 基于链式调用的回调处理
- 错误捕获与传递
- 最终状态的处理（`finally`）
- 静态方法（`resolve` 和 `reject`）

要求不使用原生的 `Promise` 进行包装，而是通过底层的状态机、回调队列和微任务等机制来独立实现 `MyPromise` 的行为。

## 需求说明

### 1. 状态管理

- **状态定义**
  `MyPromise` 必须至少具有三种状态：

  - `pending`（等待中）
  - `fulfilled`（已成功）
  - `rejected`（已拒绝）

- **状态不可逆性**
  一旦 Promise 的状态从 `pending` 转到 `fulfilled` 或 `rejected` 后，就不可再改变。

- **结果存储**
  除了状态外，需要保存成功时的值或拒绝时的原因，以便在后续的处理链中传递。

### 2. 构造函数与执行器方法

- 构造函数接收一个执行器函数 `executor(resolve, reject)`，在构造实例时立即执行。
- **处理异常**

  - 在执行器函数内部若抛出异常，应该捕获并调用 `reject`，使 Promise 状态变为拒绝。

- **resolve 和 reject 方法**
  - 需要保证当调用 `resolve(data)` 或 `reject(reason)` 时，能触发状态改变并通知已注册的回调。
  - 保证调用多次 `resolve` 或 `reject` 不会改变 Promise 的状态（即状态只能从 `pending` 转换一次）。

### 3. 链式调用：then 方法

- **回调注册**
  - `then` 方法接收两个参数：`onFulfilled`（成功时回调）、`onRejected`（失败时回调）。
  - 当 Promise 状态改变后，自动依次按注册顺序执行对应的回调函数。
- **返回新 Promise**

  - 每次 `then` 调用都应返回一个新的 Promise，从而实现链式调用。
  - 在链式调用中，若对应状态回调不存在，则需要进行“透传”：
    - 成功状态直接将原始值传递；
    - 失败状态直接将拒因传递。

- **错误传递**
  - 回调函数中的同步异常必须被捕获，确保错误能传递给链条中的下一个 `catch` 或对应的错误回调。

### 4. 错误处理：catch 方法

- 实现 `catch` 方法，其实际上等同于调用 `then(undefined, onRejected)`。
- 确保在链式调用中，只要有异常被抛出，能够进入错误分支处理。

### 5. 最终处理：finally 方法

- **无论成功或失败**
  - 无论 Promise 的状态如何，`finally` 中的回调总会被执行。
- **数据透传**
  - 若 `finally` 回调不返回新的 Promise，则应原样传递之前的结果或错误。
  - 若回调返回新的 Promise，则需要等待该 Promise 解析完成后，再将原始结果或错误传递出去。

### 6. 异步执行机制

- **回调的异步执行**
  - 必须保证所有注册的回调都是以微任务的方式异步执行，这与原生 Promise 的行为保持一致。
- **微任务方案选择**
  - 首选在 Node.js 环境中使用 `process.nextTick`；
  - 在浏览器环境中可以使用 `MutationObserver`；
  - 当以上两种方式不存在时，可使用 `setTimeout(func, 0)` 作为降级方案。

### 7. 静态方法

- **`MyPromise.resolve(value)`**

  - 如果传入的 `value` 是一个 `MyPromise` 实例，则直接返回该实例。
  - 如果传入的 `value` 是一个“类 Promise 对象”（即具有 `then` 方法），则需要等待其决议，并根据其状态决定新 Promise 的状态。
  - 对于其他普通值，直接创建一个成功状态的 `MyPromise` 并返回。

- **`MyPromise.reject(reason)`**
  - 创建并返回一个处于拒绝状态的 `MyPromise` 实例，拒因为传入的 `reason`。

## 实现注意事项

- **私有属性与封装**

  - 建议使用私有变量（例如 ES6 中的私有字段）来存储内部状态、结果值和回调函数队列，从而避免外部直接修改内部数据。

- **状态更新的原子性**

  - 确保状态转换的逻辑仅执行一次，后续对状态或结果的更新应当被忽略。

- **回调队列管理**
  - 在 Promise 状态未定（`pending`）时，必须将所有 `then` 注册的回调存入内部队列；
  - 当状态确定后，依次处理队列中的每个回调，且需要清空队列，避免重复执行。
- **异步调用细节**

  - 回调函数的执行必须在当前调用栈清空后开始（即微任务队列执行时机），从而确保符合 Promise 的异步规定。

- **异常处理**

  - 在处理每个回调时，要注意捕获内部异常并将异常传递至下一个 Promise 的拒绝处理分支。

- **链式调用与返回值处理**

  - 如果 `then` 中的回调返回的是一个新的“类 Promise 对象”，则正确处理其异步状态以及后续 `then` 的链接；
  - 如果返回普通值，则直接将该值作为下一个 Promise 的 resolve 值传递。

- **finally 的实现细节**

  - 即使在 `finally` 中注册的回调返回一个 Promise，也不要改变之前 Promise 的最终结果或拒因，原始结果应在等待 `finally` 处理完毕后透传下去。

- **then 方法非函数透传机制**
  - 当传入 `then` 的回调为非函数时，应按照当前状态直接调用内部的 `resolve` 或 `reject` 方法，实现“值透传”与“不干扰”后续链的效果。

## 小结

本题目旨在考查对 Promise 内部原理的理解，包括状态机、回调队列管理、异步执行（微任务）以及链式调用等机制。
实现过程中需要注重以下几点：

- 状态不可逆性与正确的状态转换；
- 异步回调的正确调度机制；
- 错误捕获、透传与链式调用的完善对接；
- 对“类 Promise 对象”的处理，确保静态方法的语义一致性。

## 测试代码

```js
import { describe, expect, it, suite, vi } from 'vitest'
import MyPromise from './MyPromise'

describe('myPromise', () => {
  suite('基本功能', () => {
    it('应该创建处于pending状态的promise', () => {
      const promise = new MyPromise(() => {})
      // 无法直接访问私有属性，所以只能通过行为测试状态
      let state = 'unknown'
      promise.then(
        () => {
          state = 'fulfilled'
        },
        () => {
          state = 'rejected'
        },
      )
      expect(state).toBe('unknown')
    })

    it('应该能够同步resolve', () => {
      const promise = new MyPromise((resolve) => {
        resolve('success')
      })
      return promise.then((value) => {
        expect(value).toBe('success')
      })
    })

    it('应该能够同步reject', () => {
      const promise = new MyPromise((_, reject) => {
        reject('error')
      })
      return promise.then(
        () => {
          throw new Error('不应该调用resolve')
        },
        (reason) => {
          expect(reason).toBe('error')
        },
      )
    })

    it('应该在构造函数执行出错时自动reject', () => {
      const error = new Error('constructor error')
      const promise = new MyPromise(() => {
        throw error
      })
      return promise.then(
        () => {
          throw new Error('不应该调用resolve')
        },
        (reason) => {
          expect(reason).toBe(error)
        },
      )
    })
  })

  suite('then方法', () => {
    it('应该支持链式调用then', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(value => value + 1)
        .then(value => value + 1)
        .then((value) => {
          expect(value).toBe(3)
        })
    })

    it('应该能处理then中返回的promise', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then((value) => {
          return new MyPromise((resolve) => {
            setTimeout(() => {
              resolve(value + 1)
            }, 10)
          })
        })
        .then((value) => {
          expect(value).toBe(2)
        })
    })

    it('应该正确处理多个then', () => {
      const p = new MyPromise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 10)
      })

      const onFulfilled1 = vi.fn()
      const onFulfilled2 = vi.fn()

      p.then(onFulfilled1)
      p.then(onFulfilled2)

      return new MyPromise((resolve) => {
        setTimeout(() => {
          expect(onFulfilled1).toHaveBeenCalledWith(1)
          expect(onFulfilled2).toHaveBeenCalledWith(1)
          resolve()
        }, 20)
      })
    })

    it('当onFulfilled不是函数时应该透传值', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(undefined)
        .then((value) => {
          expect(value).toBe(1)
        })
    })
  })

  suite('catch方法', () => {
    it('应该捕获reject的错误', () => {
      return new MyPromise((_, reject) => {
        reject('error')
      }).catch((reason) => {
        expect(reason).toBe('error')
      })
    })

    it('应该捕获then中抛出的错误', () => {
      return new MyPromise((resolve) => {
        resolve(1)
      })
        .then(() => {
          throw new Error('then error')
        })
        .catch((error) => {
          expect(error.message).toBe('then error')
        })
    })

    it('应该正确处理catch之后的then', () => {
      return new MyPromise((_, reject) => {
        reject('error')
      })
        .catch(() => 'recovered')
        .then((value) => {
          expect(value).toBe('recovered')
        })
    })
  })

  suite('finally方法', () => {
    it('应该在resolve后执行finally', () => {
      const onFinally = vi.fn()
      return new MyPromise((resolve) => {
        resolve('success')
      })
        .finally(onFinally)
        .then((value) => {
          expect(onFinally).toHaveBeenCalled()
          expect(value).toBe('success')
        })
    })

    it('应该在reject后执行finally', () => {
      const onFinally = vi.fn()
      return new MyPromise((_, reject) => {
        reject('error')
      })
        .finally(onFinally)
        .catch((reason) => {
          expect(onFinally).toHaveBeenCalled()
          expect(reason).toBe('error')
        })
    })
  })

  suite('静态resolve方法', () => {
    it('应该用普通值创建一个resolved的promise', () => {
      return MyPromise.resolve('value').then((value) => {
        expect(value).toBe('value')
      })
    })

    it('应该处理传入的MyPromise实例', () => {
      const original = new MyPromise((resolve) => {
        resolve('original')
      })
      const resolved = MyPromise.resolve(original)
      expect(resolved).toBe(original)
      return resolved.then((value) => {
        expect(value).toBe('original')
      })
    })

    it('应该处理传入的thenable对象', () => {
      const thenable = {
        then(resolve) {
          resolve('thenable')
        },
      }
      return MyPromise.resolve(thenable).then((value) => {
        expect(value).toBe('thenable')
      })
    })
  })

  suite('静态reject方法', () => {
    it('应该创建一个rejected的promise', () => {
      return MyPromise.reject('reason').catch((reason) => {
        expect(reason).toBe('reason')
      })
    })
  })

  suite('异步行为', () => {
    it('应该异步执行then的回调', () => {
      const promise = new MyPromise((resolve) => {
        resolve('async')
      })

      let value = 'initial'
      promise.then((result) => {
        value = result
      })

      expect(value).toBe('initial') // 期望值仍然是初始值

      return new MyPromise((resolve) => {
        setTimeout(() => {
          expect(value).toBe('async') // 期望值已经在微任务中被修改
          resolve()
        }, 0)
      })
    })

    it('应该按照Promise A+规范的顺序执行', () => {
      const order = []

      new MyPromise((resolve) => {
        order.push('promise')
        resolve()
      })
        .then(() => {
          order.push('then1')
          return new MyPromise((resolve) => {
            order.push('inner promise')
            resolve()
          }).then(() => {
            order.push('inner then')
          })
        })
        .then(() => {
          order.push('then2')
        })

      order.push('sync')

      return new MyPromise((resolve) => {
        setTimeout(() => {
          expect(order).toEqual([
            'promise',
            'sync',
            'then1',
            'inner promise',
            'inner then',
            'then2',
          ])
          resolve()
        }, 50)
      })
    })
  })

  suite('错误处理', () => {
    it('应该处理then中的回调错误', () => {
      return new MyPromise((resolve) => {
        resolve()
      })
        .then(() => {
          throw new Error('error in then')
        })
        .catch((err) => {
          expect(err.message).toBe('error in then')
        })
    })

    it('应该处理catch中的回调错误', () => {
      return new MyPromise((_, reject) => {
        reject('original error')
      })
        .catch(() => {
          throw new Error('error in catch')
        })
        .catch((err) => {
          expect(err.message).toBe('error in catch')
        })
    })

    it('应该处理finally中的回调错误', () => {
      return new MyPromise((resolve) => {
        resolve('value')
      })
        .finally(() => {
          throw new Error('error in finally')
        })
        .catch((err) => {
          expect(err.message).toBe('error in finally')
        })
    })
  })
})

```

## 答案

| 类型    | 路径                                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/days/Day 08/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2008/answer.js)       |
| TS 版本 | [problems/days/Day 08/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/days/Day%2008/ts/answer.ts) |
| Review  | [08.md](/review/08)                                                                                                                 |
