<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="card max-w-md w-full">
      <h1 class="text-3xl font-bold text-center mb-6">🏛️ Register</h1>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Full Name</label>
          <input 
            id="name"
            v-model="form.name" 
            type="text" 
            required 
            class="input-field focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input 
            id="email"
            v-model="form.email" 
            type="email" 
            required 
            class="input-field focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Password</label>
          <input 
            id="password"
            v-model="form.password" 
            type="password" 
            required 
            minlength="6"
            class="input-field focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium mb-1">Phone (Optional)</label>
          <input 
            id="phone"
            v-model="form.phone" 
            type="tel" 
            class="input-field focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="role" class="block text-sm font-medium mb-1">Register As</label>
          <select 
            id="role"
            v-model="form.role" 
            class="input-field focus:ring-blue-500"
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
          Register
        </button>
      </form>
      
      <p class="mt-4 text-center text-sm">
        Already have an account? 
        <router-link to="/login" class="text-blue-600 hover:underline font-medium">Login here</router-link>
      </p>

      <p v-if="error" class="mt-4 text-red-600 text-sm text-center" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-4 text-green-600 text-sm text-center" role="alert">{{ success }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const form = ref({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'client'
    })
    const error = ref('')
    const success = ref('')

    const handleRegister = async () => {
      error.value = ''
      success.value = ''

      try {
        const response = await api.post('/auth/register', form.value)
        
        success.value = 'Registration successful! Redirecting to login...'
        
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed'
      }
    }

    return { form, error, success, handleRegister }
  }
}
</script>
