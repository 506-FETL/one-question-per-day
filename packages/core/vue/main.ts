import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import App from './App.vue'
import pinia from './store'
import 'prismjs/themes/prism-tomorrow.css'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
