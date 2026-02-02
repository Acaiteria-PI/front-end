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
          path: 'ingredients',
          name: 'ingredients',
          component: () => import('@/views/IngredientView.vue')
        },
        {
          path: 'stock',
          name: 'stock',
          component: () => import('@/views/StockView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/FinalCupsView.vue')
        },
        {
          path: 'recipients',
          name: 'recipients',
          component: () => import('@/views/RecipientsView.vue')
        },
        {
          path: 'combos',
          name: 'combos',
          component: () => import('@/views/CombosView.vue')
        },
        {
          path: 'employees',
          name: 'employees',
          component: () => import('@/views/EmployeeView.vue')
        },
        {
          path: 'suppliers',
          name: 'suppliers',
          component: () => import('@/views/SuppliersView.vue')
        },
        {
          path: 'suppliers/new',
          name: 'supplier-create',
          component: () => import('@/views/RegisterSupplierView.vue')
        },
        {
          path: 'suppliers/:id/edit',
          name: 'supplier-edit',
          component: () => import('@/views/RegisterSupplierView.vue')
        }
      ]
    },
    {
      path: '/orders/create/:orderId?',
      name: 'create-order',
      component: () => import('@/views/ChoseOrderTypeView.vue')
    },
    {
      path: '/orders/create/custom-cup/:orderId?',
      name: 'create-custom-cup',
      component: () => import('@/views/CreateCustomCupView.vue')
    },
    {
      path: '/orders/create/final-cup/:orderId?',
      name: 'create-final-cup',
      component: () => import('@/views/CreateFinalCupView.vue')
    },
    {
      path: '/orders/create/combo/:orderId?',
      name: 'create-combo',
      component: () => import('@/views/CreateComboView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/CreatedOrdersView.vue')
    },
    {
      path: '/orders/payment-method/:orderId',
      name: 'payment-method',
      component: () => import('@/views/PaymentMethodView.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth()

  if (!authStore.user && authStore.accessToken) {
    try {
      await authStore.fetchCurrentUser()
    } catch (error) {
      console.log(error)
      authStore.logout()
      return next({ name: 'login' })
    }
  }
  if (to.name !== 'login' && !authStore.isLoggedIn) return next({ name: 'login' })
  if (to.name === 'management-menu') return next({ name: 'ingredients' })
  else return next()
})

export default router
