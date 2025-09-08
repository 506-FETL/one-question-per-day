<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

// Badge 由默认主题提供（同 <Badge type="tip|warning|danger|info" text="...">）
const { frontmatter } = useData()

type Diff = 'easy' | 'medium' | 'hard'
const diffMap: Record<Diff, 'tip' | 'warning' | 'danger'> = {
  easy: 'tip',
  medium: 'warning',
  hard: 'danger',
}

const difficultyBadge = computed(() => {
  const raw = String(frontmatter.value.difficulty || '').toLowerCase().trim()
  if (!raw)
    return null
  const type = diffMap[raw as Diff]
  if (!type)
    return null
  return { type, text: raw }
})

const tagBadges = computed(() => {
  const tags = frontmatter.value.tags
  if (!tags)
    return []
  const list = Array.isArray(tags) ? tags : [tags]
  return list
    .map((t: unknown) => String(t).trim())
    .filter(Boolean)
    .map(text => ({ type: 'info' as const, text }))
})
</script>

<template>
  <Badge
    v-if="difficultyBadge"
    :type="difficultyBadge.type"
    :text="difficultyBadge.text"
    class="difficultyBadge"
  />
  <br>
  <Badge
    v-for="tag in tagBadges"
    :key="tag.text"
    :type="tag.type"
    :text="tag.text"
  />
</template>

<style scoped>
.difficultyBadge {
  margin-bottom: 1%;
}
</style>
