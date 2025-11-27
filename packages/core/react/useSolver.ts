import { defaultSolverStatus } from '@one-question-per-day/shared'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SolverStore {
  urlDay: string
  urlSolver: string
  setUrlDay: (urlDay: string) => void
  getUrlDay: () => string
  setUrlSolver: (urlSolver: string) => void
  getUrlSolver: () => string
  reset: () => void
}

const useSolver = create<SolverStore>()(
  persist(
    (set, get) => ({
      ...defaultSolverStatus,
      setUrlDay: urlDay => set({ urlDay }),
      getUrlDay: () => get().urlDay,
      setUrlSolver: urlSolver => set({ urlSolver }),
      getUrlSolver: () => get().urlSolver,
      reset: () => set({ ...defaultSolverStatus }),
    }),
    {
      name: 'solver',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useSolver
