import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLoading } from '@/stores/loading.js'
import { useRouter } from 'vue-router'
import API from '@/services/axios.js'

export const useAuth = defineStore('auth', () => {
  const loadingStore = useLoading()
  const router = useRouter()

  const accessToken = ref(localStorage.getItem('access') || '')
  const refreshToken = ref(localStorage.getItem('refresh') || '')

  const user = ref(null)
  const isLoggedIn = computed(() => {
    return !!accessToken.value // !! statement return true if user is not null, empty string or 0
  })

  const firstLetter = computed(() => {
    return user.value?.name?.charAt(0).toUpperCase() || null
  })

  const fetchCurrentUser = async () => {
    if (!accessToken.value) return

    try {
      const res = await API.get('api/users/me/')
      user.value = res.data
    } catch (error) {
      logout()
    }
  }

  const login = async (email, password) => {
    try {
      loadingStore.isLoading = true
      const res = await API.post('token/', { email, password })
      accessToken.value = res.data.access
      refreshToken.value = res.data.refresh

      localStorage.setItem('access', accessToken.value)
      localStorage.setItem('refresh', refreshToken.value)

      await fetchCurrentUser()
      await router.push('/')
      loadingStore.isLoading = false
    } catch (err) {
      console.log('Login error: ', err.response?.data || err.message)
      loadingStore.isLoading = false
      throw err
    }
  }

  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
  }

  return {
    login,
    fetchCurrentUser,
    logout,
    user,
    accessToken,
    refreshToken,
    isLoggedIn,
    firstLetter,
  }
})
