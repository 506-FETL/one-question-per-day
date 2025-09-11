import type { PropsWithChildren } from 'react'
import React, { useId, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SlotContext, useSlotProps } from './SlotContext'

export function TextField({ id, children }: PropsWithChildren<{ id?: string }>) {
  const generatedId = useId()
  id ??= generatedId

  const slots = useMemo(() => ({
    label: { htmlFor: id },
    input: { id },
  }), [id])

  return (
    <SlotContext value={slots}>
      {children}
    </SlotContext>
  )
}

export function Label(props: React.ComponentProps<'label'>) {
  props = useSlotProps(props, 'label')
  const { className, ...rest } = props
  return (
    <label
      className={cn(
        'text-sm font-medium',
        'text-gray-700 dark:text-gray-200',
        className,
      )}
      {...rest}
    />
  )
}

export function Input(props: React.ComponentProps<'input'>) {
  props = useSlotProps(props, 'input')
  const { className, ...rest } = props
  return (
    <input
      className={cn(
        'block w-full rounded-md border px-3 py-2 sm:text-sm leading-6',
        'bg-white text-gray-900 placeholder:text-gray-400 shadow-sm',
        'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'transition-colors duration-200 ease-out',
        'dark:bg-neutral-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:border-neutral-700',
        'aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:ring-red-500/50',
        className,
      )}
      {...rest}
    />
  )
}
