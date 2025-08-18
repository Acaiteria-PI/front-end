import axios from 'axios'

const API = axios.create({
  baseURL: 'https://back-end-pi-j7rm.onrender.com/',
  // baseURL: 'http://127.0.0.1:8000/',
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
