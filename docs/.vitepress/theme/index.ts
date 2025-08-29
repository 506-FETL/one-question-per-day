import type { Theme } from 'vitepress'
import ThemeWithoutFonts from 'vitepress/theme-without-fonts'
import PageMetaBadges from '../components/PageMetaBadges.vue'
import Layout from './Layout.vue'
import 'virtual:group-icons.css'
import './my-fonts.css'

export default {
  extends: ThemeWithoutFonts,
  Layout,
  enhanceApp({ app }) {
    app.component('PageMetaBadges', PageMetaBadges)
  },
} satisfies Theme
