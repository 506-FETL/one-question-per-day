<script setup lang="ts">
import { VPTeamMembers, VPTeamPage, VPTeamPageTitle } from 'vitepress/theme'
import { countPRAuthor, listContributors } from '../utils/octokit'

const cons = await listContributors()
const prs = await countPRAuthor()

const members = cons.map(user => ({
  avatar: user.avatar_url,
  name: user.login,
  title: `countPR: ${prs[user.login || ''] || '摸鱼中'}`,
  links: [{ icon: 'github', link: user.html_url }],
}))
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>
        Team
      </template>
      <template #lead>
        协作 · 对比 · 演进
      </template>
    </VPTeamPageTitle>
    <VPTeamMembers size="small" :members="members" />
  </VPTeamPage>
</template>
