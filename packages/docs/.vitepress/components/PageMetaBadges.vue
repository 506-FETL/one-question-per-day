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
  <div v-if="difficultyBadge || tagBadges.length" class="meta-badges">
    <Badge
      v-if="difficultyBadge"
      :type="difficultyBadge.type"
      :text="difficultyBadge.text"
    />
    <Badge
      v-for="tag in tagBadges"
      :key="tag.text"
      :type="tag.type"
      :text="tag.text"
    />
  </div>
</template>

<style scoped>
.meta-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 0.5rem;
  margin: 0 0 1rem 0; /* 放在页面正文最上方，给下面正文留间距 */
}
</style>
