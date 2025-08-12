# 进阶方案

原答案:

```js
export default function generatorToAsync(func) {
  if (typeof func !== 'function' || !('next' in func())) {
    throw new TypeError(`传入的${func}必须是生成器函数`)
  }

  const iterator = func()
  const isPromiseLike = (v) => {
    if (v !== null && (typeof v === 'function' || typeof v === 'object')) {
      return typeof v.then === 'function'
    }
    return false
  }

  return () =>
    new Promise((resolve, reject) => {
      function step(prev) {
        try {
          const { value, done } = iterator.next(prev)

          if (done) {
            resolve(value)
          } else if (isPromiseLike(value)) {
            value.then(step, reject)
          } else {
            step(value)
          }
        } catch (error) {
          reject(error)
        }
      }
      step()
    })
}
```

**优点：**

- 检查传入参数是否为函数，是否有 next 方法，能防止非生成器函数误用。
- 明确处理了「yield Promise」与「yield 普通值」两种情况，递归推进生成器。
- isPromiseLike 判断较为严谨，兼容各种实现。

**缺点：**

- 只支持无参生成器（即 func()），如果生成器需要参数无法传递。
- iterator 在包装函数外部初始化，导致同一个包装函数多次调用时共用同一个迭代器，有严重的并发 bug（即：第二次调用时会继续上一次的进度）。

## 推荐与改进

代码存在迭代器外部初始化的严重 bug。

- 正确做法：每一次调用包装函数时都要新建一个迭代器。

结合两者优点，推荐如下改进版：

```js
function isGeneratorFunction(func) {
  return func && func.constructor && func.constructor.name === 'GeneratorFunction'
}

/**
 * 将生成器函数转换为异步函数（支持 yield Promise）。
 * @param {Function} func 生成器函数
 * @returns {Function} 返回一个异步函数
 */
export default function generatorToAsync(func) {
  if (!isGeneratorFunction(func)) {
    throw new TypeError(`${func} is not a generator function`)
  }

  return function (...args) {
    const iterator = func(...args)

    function isPromiseLike(v) {
      return (
        v &&
        (typeof v === 'object' || typeof v === 'function') &&
        typeof v.then === 'function'
      )
    }

    return new Promise((resolve, reject) => {
      function step(nextF, arg) {
        let result
        try {
          result = nextF(arg)
        } catch (err) {
          return reject(err)
        }

        const { value, done } = result

        if (done) return resolve(value)
        if (isPromiseLike(value)) {
          value.then(
            (val) => step(iterator.next.bind(iterator), val),
            (err) => step(iterator.throw.bind(iterator), err),
          )
        } else {
          step(iterator.next.bind(iterator), value)
        }
      }
      step(iterator.next.bind(iterator))
    })
  }
}
```

---

# **为什么需要 `.bind(iterator)`**。

## 背景代码片段

改进版 `generatorToAsync` 代码里，核心推进函数大致如下：

```js
function step(nextF, arg) {
  let result
  try {
    result = nextF(arg)
  } catch (err) {
    return reject(err)
  }

  const { value, done } = result

  if (done) return resolve(value)
  if (isPromiseLike(value)) {
    value.then(
      (val) => step(iterator.next.bind(iterator), val),
      (err) => step(iterator.throw.bind(iterator), err),
    )
  } else {
    step(iterator.next.bind(iterator), value)
  }
}
step(iterator.next.bind(iterator))
```

那么**为什么要用 `.bind(iterator)`？**

---

## 详细解释

### 1. 生成器迭代器的 next/throw 调用方式

- `iterator.next(value)` 和 `iterator.throw(error)` 必须通过对应的迭代器对象调用，而不是单纯的函数调用。
- 否则，`this` 会丢失，导致内部出错。

```js
const it = gen()
// it.next(1)  // 正确
const n = it.next
n(1) // 错误！this 丢失
```

### 2. bind 的作用

- `iterator.next.bind(iterator)` 生成一个**始终以 iterator 为 this 的函数**。
- 这样在 `step(nextF, val)` 时，`nextF(val)` 实际等价于 `iterator.next(val)`。

### 3. 为什么需要传递 nextF

- 因为有两种推进方式：
  - 正常推进：`iterator.next(val)`
  - 抛出错误推进：`iterator.throw(err)`
- 所以 `step` 需要接受“用哪种推进方式”，而不是死写成 `iterator.next`。
- 为了让 `step` 递归时灵活选择推进方式，需要把 **“推进函数”**和 **参数**都传递进来。

### 4. bind 的具体示例

假如直接传递 `iterator.next`，然后调用 `nextF(val)`，其实等价于：

```js
const nextF = iterator.next // 没有 this
nextF(val) // 'this' 不是 iterator
```

这时 `this` 是 `undefined`（严格模式），会导致运行时错误。

而使用 `.bind(iterator)` 后：

```js
const nextF = iterator.next.bind(iterator)
nextF(val) // 'this' 正确指向 iterator
```

---

## 5. 总结为一句话

> **必须用 `.bind(iterator)`，确保每次推进生成器时，`this` 始终正确指向生成器对象本身。否则会丢失上下文导致报错。**

---

## 6. 相关实验（可自行测试）

```js
function* g() {
  yield 1
}

const it = g()
const n = it.next

try {
  n() // 报错：TypeError: this is not a generator
} catch (e) {
  console.log(e.message)
}

const n2 = it.next.bind(it)
console.log(n2()) // { value: 1, done: false }
```

---

## 7. 结论

- 只要你要**拆开调用对象上的方法**，又要保证它的内部 this 正确，就应该用 bind。
- 这是 JS 中很常见的坑，比如数组的 `map`、`forEach` 也常遇到类似问题。
