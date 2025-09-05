# Day 01

# 请你实现一个 Button 按钮

> 用于触发操作的基础组件，支持多种外观和尺寸，提供加载、图标。

- 基于 `Vue`、`Tailwind`
- 默认渲染为 `button`
- API 精简，类型友好

## 基础用法

<script setup lang="ts">

import Buttons from './answer.vue'
import { Loader2Icon,ChevronRightIcon } from "lucide-vue-next"

</script>

### Default <Buttons>Button</Buttons>

### Secondary <Buttons variant="secondary">secondary</Buttons>

### Destructive <Buttons variant="destructive">Destructive</Buttons>

### Outline <Buttons variant="outline">Outline</Buttons>

### Ghost <Buttons variant="ghost">Ghost</Buttons>

### Link <Buttons variant="link">Link</Buttons>

### Icon <Buttons variant="secondary" size="icon" className="size-8"> <ChevronRightIcon /> </Buttons>

### Loading <Buttons size="sm" disabled loadingText="Please wait" :leftIcon="Loader2Icon" />

## 属性（Props）

| 属性名      | 说明           | 类型                                                                        | 可选值                  | 默认值  |
| ----------- | -------------- | --------------------------------------------------------------------------- | ----------------------- | ------- |
| variant     | 外观风格       | `default` \| `secondary` \| `destructive` \| `outline` \| `ghost` \| `link` | 同类型枚举              | default |
| size        | 尺寸           | `default` \| `sm` \| `lg` \| `icon`                                         | 同类型枚举              | default |
| loading     | 加载中         | boolean                                                                     | true / false            | false   |
| loadingText | 加载时替代文案 | string                                                                      | -                       | -       |
| leftIcon    | 左侧图标       | VNode                                                                       | -                       | -       |
| rightIcon   | 右侧图标       | VNode                                                                       | -                       | -       |
| fullWidth   | 占满整行宽度   | boolean                                                                     | true / false            | false   |
| class       | 自定义类名     | string                                                                      | -                       | -       |
| type        | 原生类型       | `button` \| `submit` \| `reset`                                             | button / submit / reset | button  |
| disabled    | 禁用           | boolean                                                                     | true / false            | false   |

## 类型定义

```ts
import type { Component, VNode } from 'vue'

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: string
  loading?: boolean
  loadingText?: string
  leftIcon?: VNode | Component | (() => VNode)
  rightIcon?: VNode | Component | (() => VNode)
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
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
