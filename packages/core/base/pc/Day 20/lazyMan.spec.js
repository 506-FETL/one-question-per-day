import { describe, expect, it, vi } from 'vitest'
import LazyMan from './LazyMan'

describe('day20-LazyMan', () => {
  it('应该支持基本的链式调用', async () => {
    const mockLog = vi.fn()

    LazyMan('Jack', mockLog)

    // 等待异步执行完成
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockLog).toHaveBeenCalledTimes(1)
    expect(mockLog).toHaveBeenCalledWith('Hi, I\'m Jack.')
  })

  it('应该支持 eat 方法', async () => {
    const mockLog = vi.fn()

    LazyMan('Jack', mockLog)
      .eat('banana')
      .eat('apple')

    // 等待异步执行完成
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockLog).toHaveBeenCalledTimes(3)
    expect(mockLog).toHaveBeenNthCalledWith(1, 'Hi, I\'m Jack.')
    expect(mockLog).toHaveBeenNthCalledWith(2, 'Eat banana.')
    expect(mockLog).toHaveBeenNthCalledWith(3, 'Eat apple.')
  })

  it('应该支持 sleep 方法', async () => {
    const mockLog = vi.fn()

    const startTime = Date.now()
    LazyMan('Jack', mockLog)
      .eat('banana')
      .sleep(1)
      .eat('apple')

    // 等待异步执行完成
    await new Promise(resolve => setTimeout(resolve, 1100))

    const endTime = Date.now()
    const duration = endTime - startTime

    expect(duration).toBeGreaterThanOrEqual(1000)
    expect(mockLog).toHaveBeenCalledTimes(4)
    expect(mockLog).toHaveBeenNthCalledWith(1, 'Hi, I\'m Jack.')
    expect(mockLog).toHaveBeenNthCalledWith(2, 'Eat banana.')
    expect(mockLog).toHaveBeenNthCalledWith(3, 'Wake up after 1 seconds.')
    expect(mockLog).toHaveBeenNthCalledWith(4, 'Eat apple.')
  })

  it('应该支持 sleepFirst 优先执行', async () => {
    const mockLog = vi.fn()

    LazyMan('Jack', mockLog)
      .eat('banana')
      .sleepFirst(1)
      .eat('apple')
      .sleep(1)

    // 等待异步执行完成
    await new Promise(resolve => setTimeout(resolve, 2100))

    expect(mockLog).toHaveBeenCalledTimes(5)
    expect(mockLog).toHaveBeenNthCalledWith(1, 'Wake up after 1 seconds.')
    expect(mockLog).toHaveBeenNthCalledWith(2, 'Hi, I\'m Jack.')
    expect(mockLog).toHaveBeenNthCalledWith(3, 'Eat banana.')
    expect(mockLog).toHaveBeenNthCalledWith(4, 'Eat apple.')
    expect(mockLog).toHaveBeenNthCalledWith(5, 'Wake up after 1 seconds.')
  })
})
