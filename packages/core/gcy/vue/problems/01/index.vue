<script setup lang="ts">
import { ProblemAnswer, ProblemDescription, Problems } from '../../layout'
import Button from './Button.vue'
import Description from './README.md'
</script>

<template>
  <Problems>
    <ProblemDescription>
      <Description />
    </ProblemDescription>
    <ProblemAnswer>
      <Button />
    </ProblemAnswer>
  </Problems>
</template>
