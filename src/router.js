import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router