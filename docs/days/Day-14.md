---
tags: [观察者模式]
difficulty: easy
---

# Day 14

# Observable

Observable 决定了values如何传递给Observer，Observer本质上就是一些callback的集合。

来看看如下代码。

```js
const observer = {
  next: (value) => {
    console.log("we got a value", value);
  },
  error: (error) => {
    console.log("we got an error", error);
  },
  complete: () => {
    console.log("ok, no more values");
  },
};
```

上面就是一个Observer，很明显就是3个callback而已。

接下来我们可以把让这个Observer订阅一个Observable，Observable 会传递给这个Observer以值(value)或者error。

```js
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => {
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
  }, 100);
});
```

上面的代码是在说，当一个subscriber订阅的时候：

1. 首先得到值 1
2. 然后得到值2
3. 等待100 ms
4. 得到值 3
5. 得到值 4
6. 没有更多的值了，结束。

如果我们现在把上面的observer 订阅给上述observable的话，next 和 complete 会被顺序调用。(注意到 2 和 3之间有些delay)

```js
const sub = observable.subscribe(subscriber);
// we got a value 1
// we got a value 2
// we got a value 3
// we got a value 4
// ok, no more values
```

注意subscribe() 返回的是一个Subscription ，这个subscription可以用来取消订阅。

```js
const sub = observable.subscribe(subscriber);
setTimeout(() => {
  // ok we only subscribe for 100ms
  sub.unsubscribe();
}, 100);
```

以上就是基本的Observable 和 Observer，后续会有更多有意思的题目，但是该题目就到这里了。

请你实现一个基本的Observable，使得上述描述的内容成为可能。

一些额外的要求列在了这里

1. error 和 complete只能触发一次。其后的next/error/complete 需要被忽略。
2. 在订阅的时候next/error/complete需要都不是必须。如果传入的是一个函数，这个函数需要被默认为next。
3. 需要支持多个订阅。

## 题目模版

```js
class Observable {
  constructor(setup) {}

  subscribe(subscriber) {}
}

export default Observable
```

## 测试代码

```js
import { describe, expect, it } from 'vitest'
import Observable from './Observable'

describe('observable 基本行为', () => {
  it('应按正确顺序传递值并完成', async () => {
    const results = []
    const observer = {
      next: v => results.push(['next', v]),
      error: e => results.push(['error', e]),
      complete: () => results.push(['complete']),
    }
    const observable = new Observable((subscriber) => {
      subscriber.next(1)
      subscriber.next(2)
      setTimeout(() => {
        subscriber.next(3)
        subscriber.next(4)
        subscriber.complete()
      }, 10)
    })

    observable.subscribe(observer)
    await new Promise(res => setTimeout(res, 20))
    expect(results).toEqual([
      ['next', 1],
      ['next', 2],
      ['next', 3],
      ['next', 4],
      ['complete'],
    ])
  })

  it('complete 后应忽略 next/error/complete', () => {
    const results = []
    const observer = {
      next: v => results.push(['next', v]),
      error: e => results.push(['error', e]),
      complete: () => results.push(['complete']),
    }
    const observable = new Observable((subscriber) => {
      subscriber.next(1)
      subscriber.complete()
      subscriber.next(2)
      subscriber.error('err')
      subscriber.complete()
    })
    observable.subscribe(observer)
    expect(results).toEqual([['next', 1], ['complete']])
  })

  it('error 后应忽略 next/error/complete', () => {
    const results = []
    const observer = {
      next: v => results.push(['next', v]),
      error: e => results.push(['error', e]),
      complete: () => results.push(['complete']),
    }
    const observable = new Observable((subscriber) => {
      subscriber.next(1)
      subscriber.error('err')
      subscriber.next(2)
      subscriber.error('err2')
      subscriber.complete()
    })
    observable.subscribe(observer)
    expect(results).toEqual([
      ['next', 1],
      ['error', 'err'],
    ])
  })

  it('subscribe 参数为函数时应作为 next', () => {
    const received = []
    const observable = new Observable((sub) => {
      sub.next(1)
      sub.next(2)
      sub.complete()
    })
    observable.subscribe(v => received.push(v))
    expect(received).toEqual([1, 2])
  })

  it('应支持多次订阅', async () => {
    const results1 = []
    const results2 = []
    const observable = new Observable((sub) => {
      sub.next(1)
      setTimeout(() => {
        sub.next(2)
        sub.complete()
      }, 10)
    })
    observable.subscribe(v => results1.push(v))
    observable.subscribe({
      next: v => results2.push(v),
      complete: () => results2.push('done'),
    })
    await new Promise(res => setTimeout(res, 20))
    expect(results1).toEqual([1, 2])
    expect(results2).toEqual([1, 2, 'done'])
  })

  it('应能正确取消订阅', async () => {
    const received = []
    const observable = new Observable((sub) => {
      let i = 0
      const id = setInterval(() => {
        sub.next(++i)
        if (i === 10)
          sub.complete()
      }, 5)
      return () => clearInterval(id)
    })
    const sub = observable.subscribe(v => received.push(v))
    await new Promise(res => setTimeout(res, 16))
    sub.unsubscribe()
    const prev = [...received]
    await new Promise(res => setTimeout(res, 16))
    expect(received).toEqual(prev) // 取消订阅后不再接收新值
  })

  it('应允许部分 observer 订阅', () => {
    const received = []
    const observable = new Observable((sub) => {
      sub.next(1)
      sub.next(2)
      sub.complete()
    })
    observable.subscribe({ next: v => received.push(v) })
    expect(received).toEqual([1, 2])
  })

  it('observer 方法缺失时不应抛出异常', () => {
    const observable = new Observable((sub) => {
      sub.next(1)
      sub.complete()
    })
    expect(() => observable.subscribe({})).not.toThrow()
    expect(() => observable.subscribe()).not.toThrow()
  })

  it('应提供 subscription.unsubscribed 属性', () => {
    const observable = new Observable((sub) => {
      sub.complete()
    })
    const sub = observable.subscribe({})
    expect(sub.unsubscribed).toBe(true)
  })
})

```

## 答案

| 类型    | 路径                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| JS 版本 | [problems/Day 14/answer.js](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2014/answer.js)       |
| TS 版本 | [problems/Day 14/ts/answer.ts](https://github.com/506-FETL/one-question-per-day/blob/main/problems/Day%2014/ts/answer.ts) |
| Review  | [14.md](/review/14)                                                                                                       |
