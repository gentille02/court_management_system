<template>
  <div class="min-h-screen flex items-center justify-center"
       style="background: var(--bg-base);">
    <div class="card max-w-md w-full">
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="text-4xl">⚖️</span>
        <h1 class="text-3xl font-bold" 
            style="font-family: 'Syne', sans-serif; color: var(--text-1);">
          Register
        </h1>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium mb-1"
                 style="color: var(--text-2);">Full Name</label>
          <input id="name" v-model="form.name" type="text" 
                 required class="input-field" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium mb-1"
                 style="color: var(--text-2);">Email</label>
          <input id="email" v-model="form.email" type="email" 
                 required class="input-field" autocomplete="email" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1"
                 style="color: var(--text-2);">Password</label>
          <input id="password" v-model="form.password" type="password"
                 required minlength="6" class="input-field"
                 autocomplete="new-password" />
          <p class="text-xs mt-1" style="color: var(--text-3);">
            Minimum 6 characters
          </p>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium mb-1"
                 style="color: var(--text-2);">Phone (Optional)</label>
          <input id="phone" v-model="form.phone" type="tel" 
                 class="input-field" />
        </div>

        <!-- Role is fixed to client. Judges/Admins are created by admin only -->
        <div class="p-3 rounded-lg" 
             style="background: var(--bg-hover); border: 1px solid var(--border);">
          <p class="text-sm" style="color: var(--text-2);">
            🔒 Registering as: 
            <span style="color: var(--accent-client);" class="font-semibold">
              Client
            </span>
          </p>
          <p class="text-xs mt-1" style="color: var(--text-3);">
            Judge and Admin accounts are created by system administrators only. Judges cannot self-register.
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary"
          style="background: var(--accent-client); color: white;"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <p v-if="error" class="mt-4 text-sm text-center p-3 rounded-lg 
                              bg-red-100 text-red-800" role="alert">
        {{ error }}
      </p>
      <p v-if="success" class="mt-4 text-sm text-center p-3 rounded-lg 
                                bg-green-100 text-green-800" role="alert">
        {{ success }}
      </p>

      <p class="mt-4 text-center text-sm" style="color: var(--text-2);">
        Already have an account?
        <router-link to="/login" 
                     style="color: var(--accent-client);" 
                     class="font-medium hover:underline">
          Login here
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
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const form = ref({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'client' // always client, not user-selectable
    })
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const handleRegister = async () => {
      error.value = ''
      success.value = ''
      loading.value = true
      try {
        await authStore.register(form.value)
        success.value = 'Registration successful! Redirecting to login...'
        setTimeout(() => router.push('/login'), 2000)
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed'
      } finally {
        loading.value = false
      }
    }

    return { form, loading, error, success, handleRegister }
  }
}
</script>