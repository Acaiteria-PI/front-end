import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/management-menu',
      name: 'management-menu',
      component: () => import('@/views/ManagementMenu.vue'),
      children: [
        {
          path: 'stock',
          name: 'stock',
          component: () => import('@/views/StockView.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuth()

  if (to.name !== 'login' && !authStore.isLoggedIn) next({ name: 'login' })
  else next()
})

export default router
