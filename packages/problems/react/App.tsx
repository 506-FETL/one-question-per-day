import { ModeToggle } from '@/components/mode-toggle'
import Problem from './problems/01/index.mdx'

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br flex flex-col">
      <div className="p-4 z-10 fixed">
        <ModeToggle />
      </div>
      <main className="flex-1 flex items-center justify-center">
        <section className="p-8 max-w-6xl w-full">
          <Problem />
        </section>
      </main>
    </div>
  )
}

export default App
