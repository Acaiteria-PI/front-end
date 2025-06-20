import { ref } from 'vue'
import axios from 'axios'

const API = 'https://back-end-pi-j7rm.onrender.com/'

export function useAuth() {
  const accessToken = ref(localStorage.getItem('access') || '')
  const refreshToken = ref(localStorage.getItem('refresh') || '')
  const user = ref(null)

  const login = async (email, password) => {
    const res = await axios.post(`${API}token/`, { email, password })
    accessToken.value = res.data.access
    refreshToken.value = res.data.refresh

    localStorage.setItem('access', accessToken.value)
    localStorage.setItem('refresh', refreshToken.value)

    await fetchUser()
  }

  const fetchUser = async () => {
    const res = await axios.get(`${API}api/users/`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    user.value = res.data[0]
  }

  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
  }

  return { login, fetchUser, logout, user, accessToken }
}
