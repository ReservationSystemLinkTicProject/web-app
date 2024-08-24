import { createRouter, createWebHashHistory } from 'vue-router'
import MainRouter from '@/modules/main/router'


const routes = [
  {
    path: "",
    ...MainRouter,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router