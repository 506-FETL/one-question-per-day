<script setup lang="ts">
import { ProblemAnswer, ProblemDescription, Problems } from '@layout/index'
import Button from './Button.vue'
import Description from './README.md'
</script>

<template>
  <Problems>
    <ProblemDescription>
      <Description />
    </ProblemDescription>
    <ProblemAnswer>
      <Button variant="destructive">
        click me
      </Button>
    </ProblemAnswer>
  </Problems>
</template>
