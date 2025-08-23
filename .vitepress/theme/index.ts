import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => {
        const { frontmatter } = useData()
        const fm = frontmatter.value
        if (!fm.tags && !fm.difficulty)
          return null
        return h('div', { class: 'meta-bar' }, [
          fm.difficulty && h('span', { class: `badge diff-${fm.difficulty}` }, fm.difficulty),
          fm.tags?.map((t: string) =>
            h('span', { class: 'badge tag', key: t }, t),
          ),
        ])
      },
    })
  },
}
