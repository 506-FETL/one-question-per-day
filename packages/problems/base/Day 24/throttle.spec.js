import { afterEach, describe, expect, it, vi } from 'vitest'
import throttle from './throttle'

afterEach(() => {
  vi.useRealTimers()
})

describe('day24 throttle', () => {
  it('默认 leading+trailing: 只立即执行一次并在窗口结束执行最后一次', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled('a1')
    throttled('a2')
    throttled('a3')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.mock.calls[0]).toEqual(['a1'])

    vi.advanceTimersByTime(100) // 触发 trailing
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.calls[1]).toEqual(['a3']) // 最后一次参数

    vi.advanceTimersByTime(100) // 清理第二个内部计时器
    expect(fn).toHaveBeenCalledTimes(2) // 没有多余调用
  })

  it('leading:false trailing:true: 首次不执行，窗口结束执行最后一次', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100, { leading: false, trailing: true })

    throttled('x1')
    throttled('x2')
    expect(fn).toHaveBeenCalledTimes(0)

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.mock.calls[0]).toEqual(['x2'])

    vi.advanceTimersByTime(150)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('leading:true trailing:false: 只有立即调用，没有尾部调用', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100, { leading: true, trailing: false })

    throttled('a')
    throttled('b')
    throttled('c')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.mock.calls[0]).toEqual(['a'])

    vi.advanceTimersByTime(100) // 定时器结束后允许下一次立即执行
    expect(fn).toHaveBeenCalledTimes(1)

    throttled('d')
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.calls[1]).toEqual(['d'])

    vi.advanceTimersByTime(100)
    throttled('e')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn.mock.calls[2]).toEqual(['e'])
  })

  it('leading:false trailing:false: 永远不会调用原函数', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100, { leading: false, trailing: false })

    throttled(1)
    throttled(2)
    vi.advanceTimersByTime(500)
    throttled(3)
    vi.advanceTimersByTime(500)

    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('上下文 this 与参数保留: trailing 使用最后一次参数', () => {
    vi.useFakeTimers()
    const calls = []
    const obj = {
      value: 42,
      method: null,
    }
    function original(a, b) {
      calls.push({ thisVal: this, args: [a, b] })
    }
    obj.method = throttle(original, 100) // 默认 leading+trailing

    obj.method(1, 'first')
    obj.method(2, 'second') // 覆盖
    obj.method(3, 'third') // 最终 trailing 应该用这个

    expect(calls.length).toBe(1)
    expect(calls[0]).toEqual({ thisVal: obj, args: [1, 'first'] })

    vi.advanceTimersByTime(100)
    expect(calls.length).toBe(2)
    expect(calls[1]).toEqual({ thisVal: obj, args: [3, 'third'] })
  })

  it('多时间窗口行为: 连续窗口中的调用次数与时序', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    // 第一个窗口
    throttled('w1-a')
    throttled('w1-b')
    vi.advanceTimersByTime(100) // trailing -> 第二次
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.calls[0]).toEqual(['w1-a'])
    expect(fn.mock.calls[1]).toEqual(['w1-b'])

    // 第二个窗口内（timer 仍在第二个 wait 周期）
    throttled('w2-a') // 不立即执行 (仍处于内部第二个 setTimeout)
    vi.advanceTimersByTime(100) // trailing -> 第三次
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn.mock.calls[2]).toEqual(['w2-a'])

    // 计时器清除后新一轮
    vi.advanceTimersByTime(100) // 清除第二级空计时器
    throttled('w3-a') // 新窗口 leading
    expect(fn).toHaveBeenCalledTimes(4)
    expect(fn.mock.calls[3]).toEqual(['w3-a'])
  })

  it('在窗口中只保留最后一次调用参数 (覆盖 savedArgs)', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = throttle(fn, 80)

    throttled('a')
    throttled('b')
    throttled('c')
    throttled('d')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.mock.calls[0]).toEqual(['a'])

    vi.advanceTimersByTime(80)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.calls[1]).toEqual(['d'])
  })
})
