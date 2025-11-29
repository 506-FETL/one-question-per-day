<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import ModeToggle from '@/components/ModeToggle.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useProblemsIndex from '@/hooks/useProblemsIndex'
import { SkeletonCard } from './layout'

import useSolver from './store/useSolver'

const solverConfig = useSolver()
const router = useRouter()

const { allSolvers, dirs } = useProblemsIndex()
const allProblems = dirs.map(dir => ({ day: dir, url: `/${dir}` }))

watch(() => solverConfig.getUrlDay, (newDay) => {
  localStorage.setItem('urlDay', newDay)
  router.replace(`${solverConfig.getUrlSolver}${newDay}`)
})

watch(() => solverConfig.getUrlSolver, (newSolver) => {
  localStorage.setItem('urlSolver', newSolver)
  router.replace(`${newSolver}${solverConfig.getUrlDay}`)
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-linear-to-br">
    <div class="pt-4 pl-4 z-20 fixed">
      <ModeToggle />
    </div>

    <div class="fixed top-4 right-4 z-20">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Select v-model="solverConfig.urlSolver">
            <SelectTrigger size="sm">
              <SelectValue placeholder="select Solver" />
            </SelectTrigger>
            <SelectContent align="center">
              <SelectItem
                v-for="solver in allSolvers"
                :key="solver.name"
                :value="`/${solver.name}`"
              >
                {{ solver.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select v-model="solverConfig.urlDay">
            <SelectTrigger size="sm">
              <SelectValue placeholder="select Day" />
            </SelectTrigger>
            <SelectContent align="center">
              <SelectItem
                v-for="problem in allProblems"
                :key="problem.day"
                :value="problem.url"
              >
                {{ problem.day }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <SkeletonCard />
      </template>
    </Suspense>
  </div>
</template>
