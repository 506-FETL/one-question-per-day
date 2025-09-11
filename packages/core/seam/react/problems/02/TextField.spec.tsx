import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input, Label, TextField } from './TextField'
import '@testing-library/jest-dom'

describe('textField · Slots 组件', () => {
  describe('基础关联行为', () => {
    it('在不传 id 时，Label 应自动关联到 Input（htmlFor === input.id）', () => {
      render(
        <TextField>
          <Label>用户名</Label>
          <Input placeholder="请输入用户名" />
        </TextField>,
      )

      const label = screen.getByText('用户名')
      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', '请输入用户名')

      const htmlFor = label.getAttribute('for') || label.getAttribute('htmlFor')
      expect(htmlFor).toBeTruthy()
      expect(input).toHaveAttribute('id', htmlFor as string)
      // 通过可访问性查询验证 label 正确关联到了 input
      expect(screen.getByLabelText('用户名')).toBe(input)
    })

    it('当 TextField 传入自定义 id 时，应优先使用该 id', () => {
      render(
        <TextField id="email">
          <Label>邮箱</Label>
          <Input type="email" placeholder="you@example.com" />
        </TextField>,
      )

      const input = screen.getByRole('textbox')
      const label = screen.getByText('邮箱')
      const htmlFor = label.getAttribute('for') || label.getAttribute('htmlFor')

      expect(input).toHaveAttribute('id', 'email')
      expect(htmlFor).toBe('email')
      expect(screen.getByLabelText('邮箱')).toBe(input)
    })
  })

  describe('子组件 props 优先合并', () => {
    it('当子组件传入 id/htmlFor，应覆盖上下文中的默认值', () => {
      render(
        <TextField id="user">
          <Label htmlFor="custom">用户名</Label>
          <Input id="custom" placeholder="覆盖默认 id" />
        </TextField>,
      )

      const input = screen.getByRole('textbox')
      const label = screen.getByText('用户名')
      const htmlFor = label.getAttribute('for') || label.getAttribute('htmlFor')

      expect(input).toHaveAttribute('id', 'custom')
      expect(htmlFor).toBe('custom')
      expect(screen.getByLabelText('用户名')).toBe(input)
    })

    it('应透传其他原生属性（如 disabled、aria-invalid、className 等）', () => {
      render(
        <TextField>
          <Label className="custom-label">用户名</Label>
          <Input placeholder="invalid input" aria-invalid disabled className="custom-input" />
        </TextField>,
      )

      const input = screen.getByRole('textbox')
      const label = screen.getByText('用户名')
      expect(input).toBeDisabled()
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(input.className).toContain('custom-input')
      expect(label.className).toContain('custom-label')
    })
  })

  describe('错误边界', () => {
    it('在 TextField 外部使用 Label 应报错', () => {
      // 期望实现：useSlotProps 在无上下文时抛出明确错误
      expect(() => render(<Label>用户名</Label>)).toThrow(
        'SlotContext must be used in TextField component',
      )
    })

    it('在 TextField 外部使用 Input 应报错', () => {
      expect(() => render(<Input />)).toThrow(
        'SlotContext must be used in TextField component',
      )
    })
  })
})
