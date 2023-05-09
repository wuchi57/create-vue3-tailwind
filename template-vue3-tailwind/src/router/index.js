import { createRouter, createWebHistory } from 'vue-router'
import interceptor from '@/router/router-interceptor.js'
import constantRouters from '@/router/constant.js'

const routes = [...constantRouters]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

router.beforeEach(interceptor)

export default router