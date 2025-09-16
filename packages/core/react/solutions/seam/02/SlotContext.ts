import { createContext, use } from 'react'

type Slots = Record<string, Record<string, unknown>>

export const SlotContext = createContext<Slots | null>(null)

export function useSlotProps<Props>(props: Props, slot: string) {
  const slots = use(SlotContext)

  if (!slots)
    throw new Error('SlotContext must be used in TextField component')

  return {
    ...slots[slot],
    slot,
    ...props,
  } as Props
}
