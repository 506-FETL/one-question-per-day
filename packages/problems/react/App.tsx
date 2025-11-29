import { defaultUrlDay } from '@one-question-per-day/shared'
import { Suspense } from 'react'
import {
  useNavigate,
  useRoutes,
} from 'react-router-dom'
import routes from '~react-pages'
import { ModeToggle } from '@/components/mode-toggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

const files = import.meta.glob('./problems/*/index.tsx')
const dirs = Array.from(new Set(Object.keys(files).map(p => p.split('/')[2]))).sort()
const allProblems = dirs.map((dir) => {
  return { day: dir, url: `/${dir}` }
})

function App() {
  const navigate = useNavigate()
  const urlDay = localStorage.getItem('urlDay') || defaultUrlDay

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br">
      <div className="pt-4 pl-4 z-20 fixed flex items-center gap-2">
        <ModeToggle />
      </div>

      <div className="fixed top-4 right-4 z-20">
        <Select
          onValueChange={(day) => {
            localStorage.setItem('urlDay', day)
            navigate(day)
          }}
          defaultValue={urlDay}
        >
          <SelectTrigger size="sm">
            <SelectValue placeholder="select Day" />
          </SelectTrigger>
          <SelectContent align="center">
            {allProblems.map(problem => (
              <SelectItem key={problem.day} value={problem.url}>
                {problem.day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<SkeletonCard />}>
        {useRoutes(routes)}
      </Suspense>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col space-y-6 w-full max-w-md">
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default App
