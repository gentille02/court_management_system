<template>
  <div class="min-h-screen flex items-center justify-center" 
       style="background: var(--bg-base);">
    <div class="card max-w-md w-full">
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="text-4xl">⚖️</span>
        <h1 class="text-3xl font-bold" 
            style="font-family: 'Syne', sans-serif; color: var(--text-1);">
          CMS
        </h1>
      </div>
      <p class="text-center mb-6" style="color: var(--text-2);">
        Court Management System
      </p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1" 
                 style="color: var(--text-2);">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input-field"
            autocomplete="email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1" 
                 style="color: var(--text-2);">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input-field"
            autocomplete="current-password"
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium mb-1" 
                 style="color: var(--text-2);">Login As</label>
          <select
            id="role"
            v-model="role"
            required
            class="input-field"
          >
            <option value="">-- Select Role --</option>
            <option value="client">Client</option>
            <option value="judge">Judge</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary"
          style="background: var(--accent-client); color: white;"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p v-if="error" class="mt-4 text-sm text-center p-3 rounded-lg 
                              bg-red-100 text-red-800" role="alert">
        {{ error }}
      </p>

      <p class="mt-4 text-center text-sm" style="color: var(--text-2);">
        Don't have an account?
        <router-link to="/register" 
                     style="color: var(--accent-client);" 
                     class="font-medium hover:underline">
          Register here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')
    const role = ref('')
    const loading = ref(false)
    const error = ref('')

    const handleLogin = async () => {
      error.value = ''
      loading.value = true
      try {
        await authStore.login({ 
          email: email.value,
          password: password.value,
          role: role.value
        })
        // Route based on what the SERVER returned, not what user selected
        router.push(`/${authStore.user.role}`)
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed'
      } finally {
        loading.value = false
      }
    }

    return { email, password, role, loading, error, handleLogin }
  }
}
</script>