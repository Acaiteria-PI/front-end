import { ref } from 'vue'
import axios from 'axios'
import { useLoading } from '@/stores/loading.js'
import { useRouter } from 'vue-router'


// const API = 'https://back-end-pi-j7rm.onrender.com/'
const API = 'http://127.0.0.1:8000/'

export function useAuth() {
  const loadingStore = useLoading()
  const router = useRouter()

  const accessToken = ref(localStorage.getItem('access') || '')
  const refreshToken = ref(localStorage.getItem('refresh') || '')

  const user = ref(null)
  const firstLetter = ref(null)

  const findFirstLetter = (name) => {
    firstLetter.value = name.substr(0, 1)
  }

  const fetchCurrentUser = async () => {
    const res = await axios.get(`${API}api/users/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    })
    user.value = res.data
    findFirstLetter(res.data.name)
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

  return { login, fetchCurrentUser, logout, user, accessToken }
}
