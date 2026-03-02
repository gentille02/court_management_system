<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="card max-w-md w-full">
      <h1 class="text-3xl font-bold text-center mb-6">🏛️ Court Management System</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            required 
            class="input-field focus:ring-blue-500"
            aria-describedby="email-help"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            required 
            class="input-field focus:ring-blue-500"
            aria-describedby="password-help"
          />
        </div>
        
        <div>
          <label for="role" class="block text-sm font-medium mb-1">Login As</label>
          <select 
            id="role"
            v-model="role" 
            class="input-field focus:ring-blue-500"
            aria-describedby="role-help"
          >
            <option value="client">Client</option>
            <option value="judge">Judge</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          class="w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      
      <p v-if="error" class="mt-4 text-red-600 text-sm text-center" role="alert">{{ error }}</p>
      
      <p class="mt-4 text-center text-sm">
        Don't have an account? 
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const role = ref('client')
    const error = ref('')

    const handleLogin = async () => {
      try {
        const response = await api.post('/auth/login', {
          email: email.value,
          password: password.value,
          role: role.value
        })
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        router.push(`/${role.value}`)
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed'
      }
    }

    return { email, password, role, error, handleLogin }
  }
}
</script>
