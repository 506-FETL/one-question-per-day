import type { DefaultSolverStatus } from '@one-question-per-day/shared'
import { defaultSolverStatus } from '@one-question-per-day/shared'
import { defineStore } from 'pinia'

const useSolver = defineStore('solver', {
  state: (): DefaultSolverStatus => ({
    ...defaultSolverStatus,
  }),
  getters: {
    getUrlDay: state => state.urlDay,
    getUrlSolver: state => state.urlSolver,
  },
  actions: {
    setUrlDay(urlDay: string) {
      this.urlDay = urlDay
    },
    setUrlSolver(urlSolver: string) {
      this.urlSolver = urlSolver
    },
  },
  persist: true,
})

export default useSolver
