<script setup lang="ts">
import ThemeWithoutFonts from 'vitepress/theme-without-fonts'

const { Layout } = ThemeWithoutFonts
</script>

<template>
  <Layout>
    <template #doc-before>
      <PageMetaBadges />
    </template>
  </Layout>
</template>
