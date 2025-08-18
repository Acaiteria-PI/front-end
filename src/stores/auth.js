import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useLoading } from '@/stores/loading.js'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {

// const API = 'https://back-end-pi-j7rm.onrender.com/'
  const API = 'http://127.0.0.1:8000/'

  const loadingStore = useLoading()
  const router = useRouter()

  const accessToken = ref(localStorage.getItem('access') || '')
  const refreshToken = ref(localStorage.getItem('refresh') || '')

  const user = ref(null)
  const isLoggedIn = computed(() => {
    return !!user.value // !! statement return true if user is not null, empty string or 0
  })

  const firstLetter = computed(() => {
    return user.value?.name?.charAt(0).toUpperCase() || null
  })

  const fetchCurrentUser = async () => {
    const res = await axios.get(`${API}api/users/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    })
    user.value = res.data
  }

  const login = async (email, password) => {
    try {
      loadingStore.isLoading = true
      const res = await axios.post(`${API}token/`, { email, password })
      accessToken.value = res.data.access
      refreshToken.value = res.data.refresh

      localStorage.setItem('access', accessToken.value)
      localStorage.setItem('refresh', refreshToken.value)
      loadingStore.isLoading = false

      await fetchCurrentUser()
      await router.push('/')

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

  return { login, fetchCurrentUser, logout, user, accessToken, isLoggedIn, firstLetter }
})
