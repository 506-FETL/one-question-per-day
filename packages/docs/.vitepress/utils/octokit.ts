import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  userAgent: 'one-question-per-day-inspector/1.0.0',
})

export async function listContributors(owner: string = '506-FETL', repo: string = 'one-question-per-day') {
  const all = await octokit.paginate(
    octokit.repos.listContributors,
    { owner, repo, per_page: 100 },
    res => res.data,
  )

  return all.sort((a, b) => (b.contributions ?? 0) - (a.contributions ?? 0)).filter(user => user.type !== 'Bot' && user.login !== 'actions-user')
}

export async function getRepo(owner: string = '506-FETL', repo: string = 'one-question-per-day') {
  const { data } = await octokit.repos.get({ owner, repo })
  return data
}

export async function countPRAuthor(owner: string = '506-FETL', repo: string = 'one-question-per-day') {
  const prs = await octokit.paginate(
    octokit.pulls.list,
    { owner, repo, state: 'all' as const, per_page: 100 },
    res => res.data,
  )

  const authorCounts = prs.reduce((acc, pr) => {
    const login = pr.user?.login
    if (login && login !== 'actions-user') {
      acc[login] = (acc[login] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return authorCounts
}
