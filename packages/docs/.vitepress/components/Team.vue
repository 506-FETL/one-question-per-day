<script setup lang="ts">
import { VPTeamMembers, VPTeamPage, VPTeamPageTitle } from 'vitepress/theme'
import { onMounted, ref } from 'vue'
import { countPRAuthor, listContributors } from '../utils/octokit'

// 缓存相关常量
const CACHE_KEY = 'oqpd_team_cache_v1'
const CACHE_TTL = 60 * 60 * 1000 // 1 小时

interface CachedData {
  ts: number
  members: any[]
}

const members = ref<any[]>([])
const loading = ref(true)

function buildMembers(cons: any[], prs: Record<string, number>) {
  return cons.map(user => ({
    avatar: user.avatar_url,
    name: user.login,
    title: `countPR: ${prs[user.login || ''] || '摸鱼中'}`,
    links: [{ icon: 'github', link: user.html_url }],
  }))
}

async function fetchRemote(): Promise<any[] | null> {
  try {
    const [cons, prs] = await Promise.all([
      listContributors(),
      countPRAuthor(),
    ])
    return buildMembers(cons, prs)
  }
  catch (e) {
    console.error('[Team] 获取远程数据失败:', e)
    return null
  }
}

function readCache(): CachedData | null {
  if (typeof window === 'undefined')
    return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw)
      return null
    return JSON.parse(raw) as CachedData
  }
  catch (e) {
    console.warn('[Team] 解析缓存失败，忽略', e)
    return null
  }
}

function writeCache(membersData: any[]) {
  try {
    const payload: CachedData = { ts: Date.now(), members: membersData }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  }
  catch (e) {
    console.warn('[Team] 写入缓存失败', e)
  }
}

onMounted(async () => {
  if (typeof window === 'undefined')
    return

  const cached = readCache()
  const now = Date.now()

  if (cached && (now - cached.ts) < CACHE_TTL && Array.isArray(cached.members)) {
    members.value = cached.members
    loading.value = false
    // 如果即将过期(<10分钟)静默刷新
    if ((now - cached.ts) > (CACHE_TTL - 10 * 60 * 1000)) {
      fetchRemote().then((fresh) => {
        if (fresh) {
          members.value = fresh
          writeCache(fresh)
        }
      })
    }
    return
  }

  const fresh = await fetchRemote()
  if (fresh) {
    members.value = fresh
    writeCache(fresh)
  }
  else if (cached) {
    members.value = cached.members
  }
  loading.value = false
})
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

    <div v-if="loading" class="py-8 text-center opacity-60 text-sm">
      加载中…
    </div>
    <VPTeamMembers v-else size="small" :members="members" />
  </VPTeamPage>
</template>
