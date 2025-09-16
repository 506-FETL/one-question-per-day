import { useMemo } from 'react'

// 约定：当前应用的页面目录为 `solutions/<solver>/<day>/...`
// 我们通过 import.meta.glob 捕获这些路径，以推导 solver 名称与 day 目录。
export default function useProblemsIndex() {
  // 仅需路径，不加载模块；绝对以包根为基（Vite 会将以 / 开头解析为项目根）
  const files = import.meta.glob('/solutions/*/*/**', { eager: false })

  return useMemo(() => {
    const paths = Object.keys(files)

    // 提取 solver 与 day，基于结构：/solutions/{solver}/{day}/...
    const tuples: Array<{ solver: string, day: string | null }> = []

    for (const p of paths) {
      const segs = p.split('/').filter(Boolean)
      // 找到 'solutions' 段
      const idx = segs.indexOf('solutions')
      if (idx === -1)
        continue
      const solver = segs[idx + 1]
      const daySeg = segs[idx + 2] ?? null
      if (!solver)
        continue

      // 只接受形如 `01`、`02` 的两位数字作为 day
      const day = daySeg && /^\d{2}$/.test(daySeg) ? daySeg : null
      tuples.push({ solver, day })
    }

    const solverSet = new Set<string>()
    const dayCountBySolver = new Map<string, Set<string>>()

    for (const { solver, day } of tuples) {
      solverSet.add(solver)
      if (!dayCountBySolver.has(solver))
        dayCountBySolver.set(solver, new Set())
      if (day)
        dayCountBySolver.get(solver)!.add(day)
    }

    // allSolvers: 取每个 solver 目录名
    const allSolvers = Array.from(solverSet).sort().map(name => ({ name }))

    // 最大 Day 数量：计算每个 solver 下 day 的数量，取最大
    let maxDays = 0
    for (const s of dayCountBySolver.keys()) {
      maxDays = Math.max(maxDays, dayCountBySolver.get(s)!.size)
    }

    // 输出 dirs：根据最大值生成 '01'..'NN'
    const dirs = Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'))

    return { allSolvers, dirs }
  }, [files])
}
