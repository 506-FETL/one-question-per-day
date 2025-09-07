---
tags: [封装,React]
difficulty: medium
---

# Day 19

# 实现一个 Button 按钮

> 用于触发操作的基础组件，支持多种外观和尺寸，提供加载、图标。

- 基于 `React`、`Tailwind`
- 默认渲染为 `button`
- API 精简，类型友好

## 用法示例

### Default

```tsx
<Button>Button</Button>
```

### Variant

```tsx
<Button variant="secondary">Secondary</Button>
```

### Icon

```tsx
import { ChevronRightIcon } from "lucide-react"

<Button size="icon">
  <ChevronRightIcon />
</Button>
```

### With Icon

```tsx
import { IconGitBranch } from "@tabler/icons-react"

<Button leftIcon={<IconGitBranch />}>
   New Branch
</Button>
```

## 属性（Props）

继承 `React.ButtonHTMLAttributes<HTMLButtonElement>`
| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| ----------- | ------------------ | --------------------------------------------------------------- | ------------------------------------ | ------- |
| variant | 外观风格 | `default \| secondary \| destructive \| outline \| ghost \| link` | 同左 | `default` |
| size | 尺寸 | `sm \| md \| lg \| icon` | 同左| `md` |
| loading | 加载中（自动禁用） | `boolean` | `true \| false` | `false` |
| loadingText | 加载时替代文案 | `string` | — | — |
| leftIcon | 左侧图标 | `ReactNode` | — | — |
| rightIcon | 右侧图标 | `ReactNode` | — | — |
| fullWidth | 占满整行宽度 | `boolean` | `true \| false` | `false` |
| className | 自定义类名 | `string` | — | — |
| type | 原生类型 | `button \| submit \| reset` | — | `button`|
| disabled | 禁用 | `boolean` | `true \| false` | `false` |

## 类型定义

```ts
import type React from 'react'

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}
```

## 样式

### 按钮基础样式:

```css
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
```

### 不同 variant 对应的类名

```css
default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
link: 'text-primary underline-offset-4 hover:underline',
```

### 按钮大小尺寸

```css
default: 'h-9 px-4 py-2 has-[>svg]:px-3',
sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
icon: 'size-9',
```

## 题目模版

::: code-group

```tsx [index.tsx]
import Button from './Button'

export default function Problem() {
  return (
    <>
      <Button />
    </>
  )
}
```

```tsx [Button.tsx]
function Button() {
  return (
    <div>Button</div>
  )
}

export default Button
```

```ts [types.ts]
import type React from 'react'

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}
```

:::

## 测试代码

```tsx
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
```

## 答案

| 类型   | 路径                                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------------------- |
| 答案   | [problems/Day 19](https://github.com/506-FETL/one-question-per-day/tree/main/packages/problems/react/problems/01) |
| Review | [19.md](/review/19)                                                                                               |
