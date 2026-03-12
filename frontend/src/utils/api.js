import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running or connection lost')
      alert('Cannot connect to server. Please ensure backend is running on port 5000.')
    }
    return Promise.reject(error)
  }
)

export default api
