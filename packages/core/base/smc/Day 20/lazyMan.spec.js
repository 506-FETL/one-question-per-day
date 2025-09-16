import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LazyMan from './lazyMan'

const calls = spy => spy.mock.calls.map(args => args[0])
// 尝试多次冲刷微任务，覆盖链式 then 的情况
async function flushMicrotasks(times = 3) {
  for (let i = 0; i < times; i++) {
    await Promise.resolve()
  }
}

describe('lazyMan 行为验证', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // 确保不会有残留计时器影响后续用例
    try {
      vi.clearAllTimers()
    }
    catch (e) {
      // ignore
    }
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('应该在下一个微任务中问候', async () => {
    const log = vi.fn()
    LazyMan('Jack', log)

    expect(log).not.toHaveBeenCalled()

    await flushMicrotasks()
    expect(calls(log)).toEqual([`Hi, I'm Jack.`])
  })

  it('应该支持链式调用并返回同一对象', async () => {
    const log = vi.fn()
    const lm = LazyMan('Jack', log)
    const ret = lm.eat('banana').sleep(1).eat('apple')
    expect(ret).toBe(lm)

    await flushMicrotasks()
    expect(calls(log)).toEqual([`Hi, I'm Jack.`, `Eat banana.`])

    await vi.advanceTimersByTimeAsync(1000) // 关键：用异步版本以便执行定时器中的微任务
    expect(calls(log)).toEqual([
      `Hi, I'm Jack.`,
      `Eat banana.`,
      `Wake up after 1 second.`,
      `Eat apple.`,
    ])
  })

  it('当存在 sleepFirst 时，应先等待再打印问候与后续操作', async () => {
    const log = vi.fn()
    LazyMan('Jack', log).sleepFirst(1).eat('banana')

    await flushMicrotasks()
    expect(log).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(calls(log)).toEqual([
      `Wake up after 1 second.`,
      `Hi, I'm Jack.`,
      `Eat banana.`,
    ])
  })

  it('多个 sleepFirst 应按声明顺序依次等待', async () => {
    const log = vi.fn()
    LazyMan('Jack', log).sleepFirst(1).sleepFirst(2).eat('banana')

    await flushMicrotasks()
    expect(log).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(calls(log)).toEqual([`Wake up after 1 second.`])

    await vi.advanceTimersByTimeAsync(2000)
    expect(calls(log)).toEqual([
      `Wake up after 1 second.`,
      `Wake up after 2 seconds.`,
      `Hi, I'm Jack.`,
      `Eat banana.`,
    ])
  })

  it('sleep 会阻塞其后的任务', async () => {
    const log = vi.fn()
    LazyMan('Jack', log).eat('A').sleep(2).eat('B').eat('C')

    await flushMicrotasks()
    expect(calls(log)).toEqual([`Hi, I'm Jack.`, `Eat A.`])

    await vi.advanceTimersByTimeAsync(2000)
    expect(calls(log)).toEqual([
      `Hi, I'm Jack.`,
      `Eat A.`,
      `Wake up after 2 seconds.`,
      `Eat B.`,
      `Eat C.`,
    ])
  })

  it.each([
    { seconds: 1, message: 'Wake up after 1 second.' },
    { seconds: 2, message: 'Wake up after 2 seconds.' },
    { seconds: 3, message: 'Wake up after 3 seconds.' },
  ])('sleep($seconds) 文案应正确（单复数）', async ({ seconds, message }) => {
    const log = vi.fn()
    LazyMan('Jack', log).sleep(seconds)

    await flushMicrotasks()
    expect(calls(log)).toEqual([`Hi, I'm Jack.`])

    await vi.advanceTimersByTimeAsync(seconds * 1000)
    expect(calls(log).at(-1)).toBe(message)
  })

  it('复杂链路应严格按照声明顺序执行', async () => {
    const log = vi.fn()
    LazyMan('Jack', log)
      .sleepFirst(1)
      .eat('A')
      .sleep(2)
      .eat('B')
      .sleepFirst(1)
      .eat('C')

    await flushMicrotasks()
    expect(log).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(calls(log)).toEqual([`Wake up after 1 second.`])

    await vi.advanceTimersByTimeAsync(1000)
    expect(calls(log)).toEqual([
      `Wake up after 1 second.`,
      `Wake up after 1 second.`,
      `Hi, I'm Jack.`,
      `Eat A.`,
    ])

    await vi.advanceTimersByTimeAsync(2000)
    expect(calls(log)).toEqual([
      `Wake up after 1 second.`,
      `Wake up after 1 second.`,
      `Hi, I'm Jack.`,
      `Eat A.`,
      `Wake up after 2 seconds.`,
      `Eat B.`,
      `Eat C.`,
    ])
  })

  it('只调用 sleepFirst 时，应在计时结束后输出醒来与问候', async () => {
    const log = vi.fn()
    LazyMan('Solo', log).sleepFirst(1)

    await flushMicrotasks()
    expect(log).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(calls(log)).toEqual([
      `Wake up after 1 second.`,
      `Hi, I'm Solo.`,
    ])
  })
})
