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
