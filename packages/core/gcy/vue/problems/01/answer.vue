<!-- eslint-disable ts/no-unused-vars -->
<script setup lang="ts">
import type { ButtonProps, ButtonSize, ButtonVariant } from './types'
import { computed, defineExpose, ref, useAttrs, useSlots } from 'vue'
import { cn } from '../../src/lib/utils'

defineOptions({ name: 'UiButton' })

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'lg',
  loading: false,
  loadingText: undefined,
  fullWidth: false,
  type: 'button',
})

const baseClasses
  = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  destructive:
    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
  outline:
    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2 has-[>svg]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
  icon: 'size-9',
}

const slots = useSlots()
const attrs = useAttrs()

const leftContent = computed(() => Boolean(slots.left))
const rightContent = computed(() => Boolean(slots.right))

const restAttrs = computed(() => {
  const {
    class: _class,
    type: _type,
    disabled: _disabled,
    'aria-busy': _ariaBusy,
    'data-variant': _dv,
    'data-size': _ds,
    'data-loading': _dl,
    'data-full-width': _dfw,
    ...rest
  } = attrs as Record<string, any>
  return rest
})

const disabledAttr = computed<boolean>(() => {
  return !!props.disabled
})

const classes = computed(() =>
  cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.fullWidth ? 'w-full' : '',
    props.variant,
    props.size,
    attrs.class as string,
  ),
)

const buttonRef = ref<HTMLButtonElement | null>(null)
defineExpose({ el: buttonRef })
</script>

<template>
  <button
    ref="buttonRef" :type="type" :class="classes" :aria-busy="loading ? 'true' : undefined"
    :disabled="loading || disabledAttr" :data-variant="variant" :data-size="size"
    :data-loading="loading ? 'true' : undefined" :data-full-width="fullWidth ? 'true' : undefined" v-bind="restAttrs"
  >
    <span v-if="leftContent" class="mr-2 inline-flex items-center" :data-testid="loading ? undefined : 'left'">

      <slot name="left" />
    </span>

    <span>
      <template v-if="loading && loadingText">
        {{ loadingText }}
      </template>
      <template v-else>
        <slot />
      </template>
    </span>

    <span v-if="!loading && rightContent" class="ml-2 inline-flex items-center" data-testid="right">
      <slot name="right" />
    </span>
  </button>
</template>
