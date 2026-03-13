import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    token.value = response.data.token
    user.value = response.data.user
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const register = async (userData) => {
    await api.post('/auth/register', userData)
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Fetch current user from server (useful if data got lost)
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/me')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return user.value
    } catch (err) {
      console.error('Failed to fetch current user', err)
      return null
    }
  }

  return { user, token, isAuthenticated, login, register, logout, fetchCurrentUser }
})
