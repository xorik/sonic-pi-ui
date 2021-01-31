import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SynthMaker from '@/components/SynthMaker.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: SynthMaker,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
