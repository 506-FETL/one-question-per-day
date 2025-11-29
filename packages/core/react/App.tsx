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
import useProblemsIndex from '@/hooks/useProblemsIndex'
import useSolver from './useSolver'

function App() {
  const navigate = useNavigate()
  const { urlDay, urlSolver, setUrlDay, setUrlSolver } = useSolver()
  const { allSolvers, dirs } = useProblemsIndex()
  const allProblems = dirs.map(dir => ({ day: dir, url: `/${dir}` }))

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br">
      <div className="pt-4 pl-4 z-20 fixed">
        <ModeToggle />
      </div>

      <div className="fixed top-4 right-4 z-20">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              onValueChange={(solver) => {
                setUrlSolver(solver)
                navigate(`${solver}${urlDay}`)
              }}
              defaultValue={urlSolver}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="select Solver" />
              </SelectTrigger>
              <SelectContent align="center">
                {allSolvers.map(({ name }) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onValueChange={(day) => {
                setUrlDay(day)
                navigate(`${urlSolver}${day}`)
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
        </div>
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
