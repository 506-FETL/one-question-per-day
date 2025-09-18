import { describe, expect, it, vi } from 'vitest'
import fetchWithAutoRetry from './fetchWithAutoRetry'

describe('fetchWithAutoRetry', () => {
  it('应该在第一次调用就成功时返回结果', async () => {
    const fetcher = vi.fn().mockResolvedValue('ok')

    const result = await fetchWithAutoRetry(fetcher, 3)

    expect(result).toBe('ok')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('应该在失败几次后成功时返回最终结果', async () => {
    let attempt = 0
    const fetcher = vi.fn(() => {
      attempt++
      if (attempt < 3) {
        return Promise.reject('network error')
      }
      return Promise.resolve('ok')
    })

    const result = await fetchWithAutoRetry(fetcher, 5)

    expect(result).toBe('ok')
    expect(fetcher).toHaveBeenCalledTimes(3)
  })

  it('应该在超过最大重试次数后抛出错误', async () => {
    const fetcher = vi.fn(() => Promise.reject('always fail'))

    await expect(fetchWithAutoRetry(fetcher, 2)).rejects.toBe('always fail')
    // 初始尝试 + 2 次重试 = 3 次调用
    expect(fetcher).toHaveBeenCalledTimes(3)
  })
})
