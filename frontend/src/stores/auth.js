import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(sessionStorage.getItem('user') || 'null'))
  const token = ref(sessionStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    token.value = response.data.token
    user.value = response.data.user
    sessionStorage.setItem('token', token.value)
    sessionStorage.setItem('user', JSON.stringify(user.value))
  }

  const register = async (userData) => {
    await api.post('/auth/register', userData)
  }

  const logout = () => {
    token.value = ''
    user.value = null
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/me')
      user.value = response.data
      sessionStorage.setItem('user', JSON.stringify(user.value))
      return user.value
    } catch (err) {
      console.error('Failed to fetch current user', err)
      return null
    }
  }

  return { user, token, isAuthenticated, login, register, logout, fetchCurrentUser }
})
