const Solvers = ['seam', 'gcy'] as const

export const defaultSolverStatus: {
  urlDay: string
  urlSolver: (typeof Solvers)[number]
} = {
  urlDay: '01',
  urlSolver: Solvers[0],
}
export type DefaultSolverStatus = typeof defaultSolverStatus
