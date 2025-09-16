import type { PropsWithChildren } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function Code({ children }: PropsWithChildren) {
  return (
    <ScrollArea className="rounded-md border p-4">
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
