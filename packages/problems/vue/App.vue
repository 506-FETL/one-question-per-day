<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import ModeToggle from '@/components/ModeToggle.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SkeletonCard } from './layout'

const router = useRouter()
const urlDay = ref(localStorage.getItem('urlDay') || '/01')

const allProblems = [
  { day: '01', url: '/01' },
  { day: '02', url: '/02' },
]

watch(urlDay, (val, oldVal) => {
  if (val && val !== oldVal) {
    localStorage.setItem('urlDay', val)
    if (router.currentRoute.value.path !== val)
      router.push(val)
  }
})

onMounted(() => {
  if (router.currentRoute.value.path !== urlDay.value)
    router.replace(urlDay.value)
})
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br">
    <div class="pt-4 pl-4 z-20 fixed">
      <ModeToggle />
    </div>

    <div class="fixed top-4 right-4 z-20">
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
