<script setup lang="ts">
import Skeleton from '@/components/ui/skeleton.vue'
</script>

<template>
  <div className="w-full min-h-screen flex items-center justify-center px-4">
    <div className="flex flex-col space-y-6 w-full max-w-md">
      <Skeleton class-name="h-48 w-full rounded-xl" />
      <div className="space-y-3">
        <Skeleton class-name="h-5 w-3/4" />
        <Skeleton class-name="h-5 w-2/3" />
        <Skeleton class-name="h-5 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton class-name="h-4 w-full" />
        <Skeleton class-name="h-4 w-5/6" />
        <Skeleton class-name="h-4 w-2/3" />
      </div>
    </div>
  </div>
</template>
