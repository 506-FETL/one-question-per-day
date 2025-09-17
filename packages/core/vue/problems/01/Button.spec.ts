import type { ButtonSize, ButtonVariant } from './types'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Button from './answer.vue'

describe('button 组件', () => {
  // 基本渲染测试
  it('应该正确渲染默认按钮', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '测试按钮',
      },
    })

    expect(wrapper.text()).toContain('测试按钮')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('data-variant')).toBe('default')
    expect(wrapper.attributes('data-size')).toBe('lg')
    expect(wrapper.attributes('data-loading')).toBeUndefined()
    expect(wrapper.attributes('data-full-width')).toBeUndefined()
  })

  // 变体(variant)测试
  it('应该根据variant属性应用正确的样式类', () => {
    const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']

    variants.forEach((variant) => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: '变体按钮' },
      })

      expect(wrapper.attributes('data-variant')).toBe(variant)

      // 验证每个变体都应用了正确的类
      if (variant === 'default') {
        expect(wrapper.classes()).toContain('bg-primary')
      }
      else if (variant === 'destructive') {
        expect(wrapper.classes()).toContain('bg-destructive')
      }
      else if (variant === 'outline') {
        expect(wrapper.classes()).toContain('border')
      }
      else if (variant === 'secondary') {
        expect(wrapper.classes()).toContain('bg-secondary')
      }
      else if (variant === 'ghost') {
        expect(wrapper.classes()).toContain('hover:bg-accent')
      }
      else if (variant === 'link') {
        expect(wrapper.classes()).toContain('text-primary')
      }
    })
  })

  // 尺寸(size)测试
  it('应该根据size属性应用正确的样式类', () => {
    const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon']

    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: '尺寸按钮' },
      })

      expect(wrapper.attributes('data-size')).toBe(size)

      // 验证每个尺寸都应用了正确的类
      if (size === 'default') {
        expect(wrapper.classes()).toContain('h-9')
      }
      else if (size === 'sm') {
        expect(wrapper.classes()).toContain('h-8')
      }
      else if (size === 'lg') {
        expect(wrapper.classes()).toContain('h-10')
      }
      else if (size === 'icon') {
        expect(wrapper.classes()).toContain('size-9')
      }
    })
  })

  // 全宽(fullWidth)测试
  it('应该在fullWidth为true时应用全宽样式', () => {
    const wrapper = mount(Button, {
      props: { fullWidth: true },
      slots: { default: '全宽按钮' },
    })

    expect(wrapper.attributes('data-full-width')).toBe('true')
    expect(wrapper.classes().some(cls => cls.includes('w-full'))).toBe(true)
  })

  // 加载状态测试
  it('应该正确处理加载状态', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '加载按钮' },
    })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('data-loading')).toBe('true')
    expect(wrapper.attributes('disabled')).toBe('')
  })

  // 加载文本测试
  it('应该在加载状态且提供loadingText时显示加载文本', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        loadingText: '加载中...',
      },
      slots: { default: '按钮内容' },
    })

    expect(wrapper.text()).toContain('加载中...')
    expect(wrapper.text()).not.toContain('按钮内容')
  })

  // 禁用状态测试
  it('应该正确处理禁用状态', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用按钮' },
    })

    expect(wrapper.attributes('disabled')).toBe('')
  })

  // 按钮类型测试
  it('应该设置正确的按钮类型', () => {
    const types = ['button', 'submit', 'reset'] as const

    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type },
        slots: { default: '类型按钮' },
      })

      expect(wrapper.attributes('type')).toBe(type)
    })
  })

  // 插槽测试
  it('应该正确渲染左右插槽内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '按钮内容',
        left: '<span data-test="left-icon">L</span>',
        right: '<span data-test="right-icon">R</span>',
      },
    })

    expect(wrapper.text()).toContain('按钮内容')
    expect(wrapper.find('[data-testid="left"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="right"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="left-icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="right-icon"]').exists()).toBe(true)
  })

  // 加载状态下右侧插槽不显示
  it('应该在加载状态下隐藏右侧插槽', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: {
        default: '按钮内容',
        right: '<span data-test="right-icon">R</span>',
      },
    })

    expect(wrapper.find('[data-testid="right"]').exists()).toBe(false)
  })

  // 点击事件测试
  it('应该在点击时触发click事件', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      slots: { default: '点击按钮' },
      attrs: { onClick },
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  // 禁用状态下不触发点击事件
  it('应该在禁用状态下不触发点击事件', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '点击按钮' },
      attrs: { onClick },
    })

    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  // 加载状态下不触发点击事件
  it('应该在加载状态下不触发点击事件', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '点击按钮' },
      attrs: { onClick },
    })

    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  // 自定义类名测试
  it('应该正确合并自定义类名', () => {
    const wrapper = mount(Button, {
      slots: { default: '自定义类名按钮' },
      attrs: { class: 'custom-class' },
    })

    expect(wrapper.classes()).toContain('custom-class')
  })

  // 属性透传测试
  it('应该正确透传剩余属性', () => {
    const wrapper = mount(Button, {
      slots: { default: '属性透传按钮' },
      attrs: {
        'data-testid': 'test-button',
        'aria-label': '测试按钮',
      },
    })

    expect(wrapper.attributes('data-testid')).toBe('test-button')
    expect(wrapper.attributes('aria-label')).toBe('测试按钮')
  })

  // 引用暴露测试
  it('应该正确暴露按钮引用', () => {
    const wrapper = mount(Button)

    // 验证是否正确暴露了 el 引用
    expect(wrapper.vm.el).toBeDefined()
  })
})
