import axios from 'axios'

const API = axios.create({
  // baseURL: 'https://back-end-pi-j7rm.onrender.com/',
  baseURL: 'http://127.0.0.1:8000/',
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // a propriedade _retry está sendo criada nessa linha, o "_" é uma convenção para indicar que ela é de uso interno do sistema
      originalRequest._retry = true // Essa propriedade está sendo utilizada para evitar loops, pois se o request falhar com 401, o interceptor seria disparado novamente

      try {
        const refresh = localStorage.getItem('refresh')
        if (!refresh) throw new Error('No refresh token available')

        const res = await axios.post(`${API.defaults.baseURL}token/refresh/`, {
          refresh: refresh,
        })
        // Salva o token de acesso renovado
        const newAccessToken = res.data.access
        localStorage.setItem('access', newAccessToken)
        // Atualiza a instância do axios para futuras reqs (garantia a mais)
        API.defaults.headers.Authorization = `Bearer ${newAccessToken}`
        // Atualiza a header da req atual que caiu em 401
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        // Refaz a requisição original com token renovado
        return API(originalRequest)
      } catch (refreshError) {
        console.log('Refresh token error: ', refreshError)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        // window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default API
