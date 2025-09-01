import type { ButtonProps } from './types'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'
import '@testing-library/jest-dom'

function setup(props: Partial<ButtonProps> = {}) {
  const utils = render(<Button {...props}>Button</Button>)
  const btn = utils.getByRole('button')
  return { ...utils, btn }
}

describe('button 组件', () => {
  describe('当渲染一个按钮时', () => {
    it('应该看到传入的子内容被正确渲染', () => {
      render(<Button>Hello</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Hello')
    })

    it('应该默认具有 type="button"', () => {
      const { btn } = setup()
      expect(btn).toHaveAttribute('type', 'button')
    })

    it('应该保留自定义 className 以便样式扩展', () => {
      const { btn } = setup({ className: 'custom-class' })
      expect(btn).toHaveClass('custom-class')
    })
  })

  describe('当处理原生属性与事件时', () => {
    it('应该在点击时调用传入的 onClick 回调一次', async () => {
      const onClick = vi.fn()
      const { btn } = setup({ onClick })
      await fireEvent.click(btn)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('应该在禁用状态下阻止点击回调被触发', async () => {
      const onClick = vi.fn()
      render(
        <Button disabled onClick={onClick}>
          Button
        </Button>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeDisabled()
      await fireEvent.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })

    it('应该尊重显式传入的 type 值（例如 submit）', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('当切换外观与尺寸时', () => {
    it('应该根据 variant 切换到对应的样式（如 default -> outline）', () => {
      const { rerender } = render(<Button variant="default">Btn</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toContain('default') // 根据你的实现调整断言关键字
      rerender(<Button variant="outline">Btn</Button>)
      expect(btn.className).toContain('outline')
    })

    it('应该根据 size 切换到对应的尺寸（如 sm -> lg）', () => {
      const { rerender } = render(<Button size="sm">Btn</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toContain('sm') // 根据你的实现调整断言关键字
      rerender(<Button size="lg">Btn</Button>)
      expect(btn.className).toContain('lg')
    })

    it('应该在 fullWidth=true 时占满整行宽度', () => {
      const { btn } = setup({ fullWidth: true })
      expect(btn.className).toMatch(/w-full/)
    })
  })

  describe('当进入加载状态时', () => {
    it('应该通过 aria-busy 标记忙碌并禁止交互', async () => {
      const onClick = vi.fn()
      render(
        <Button loading onClick={onClick}>
          Button
        </Button>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveAttribute('aria-busy', 'true')
      expect(btn).toBeDisabled()
      await fireEvent.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })

    it('应该在提供 loadingText 时用其替换原有文本', () => {
      render(
        <Button loading loadingText="Please wait">
          Submit
        </Button>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveTextContent('Please wait')
      expect(btn).not.toHaveTextContent('Submit')
    })
  })

  describe('当渲染图标时', () => {
    it('应该在非加载状态下同时渲染 leftIcon 与 rightIcon', () => {
      const Left = () => <span>L</span>
      const Right = () => <span>R</span>
      render(
        <Button leftIcon={<Left />} rightIcon={<Right />}>
          Button
        </Button>,
      )
      expect(screen.getByTestId('left')).toBeInTheDocument()
      expect(screen.getByTestId('right')).toBeInTheDocument()
    })

    it('应该在加载状态下隐藏右侧图标以让位加载反馈', () => {
      const Right = () => <span data-testid="right">R</span>
      render(
        <Button loading rightIcon={<Right />}>
          Button
        </Button>,
      )
      expect(screen.queryByTestId('right')).toBeNull()
    })

    it('应该在仅图标尺寸（size="icon"）时依赖 aria-label 保证可访问性', () => {
      render(
        <Button size="icon" aria-label="Next">
          <svg data-testid="icon" />
        </Button>,
      )
      const btn = screen.getByLabelText('Next')
      expect(btn).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })
})
