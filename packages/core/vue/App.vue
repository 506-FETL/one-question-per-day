<script setup lang="ts">
import { ref, watch } from 'vue'
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

const urlDay = ref(localStorage.getItem('urlDay') || '/01')
const urlSolver = ref(localStorage.getItem('urlSolver') || '/gcy')
const router = useRouter()

const { allSolvers, dirs } = useProblemsIndex()
const allProblems = dirs.map(dir => ({ day: dir, url: `/${dir}` }))

watch(urlDay, (newDay) => {
  localStorage.setItem('urlDay', newDay)
  router.replace(`${urlSolver.value}${newDay}`)
})

watch(urlSolver, (newSolver) => {
  localStorage.setItem('urlSolver', newSolver)
  router.replace(`${newSolver}${urlDay.value}`)
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br">
    <div class="pt-4 pl-4 z-20 fixed">
      <ModeToggle />
    </div>

    <div class="fixed top-4 right-4 z-20">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Select v-model="urlSolver">
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
          <Select v-model="urlDay">
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
