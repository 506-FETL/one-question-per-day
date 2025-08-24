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
