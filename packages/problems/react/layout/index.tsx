import type { PropsWithChildren } from 'react'

export function Problems({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden pt-2 md:pt-0">
        { children }
      </main>
    </div>
  )
}

export function ProblemDescription({ children }: PropsWithChildren) {
  return (
    <aside
      className="md:w-1/2 md:basis-1/2 shrink-0 border-b md:border-b-0 md:border-r border-border/50 backdrop-blur-sm bg-background/60 md:h-screen md:sticky md:top-0 overflow-y-auto px-6 py-8"
    >
      <div className="max-w-prose mx-auto space-y-6">
        {children}
      </div>
    </aside>
  )
}

export function ProblemAnswer({ children }: PropsWithChildren) {
  return (
    <section className="md:w-1/2 md:basis-1/2 flex-1 overflow-y-auto p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Your Answer</h1>
        </header>
        {children}
      </div>
    </section>
  )
}
