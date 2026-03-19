<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="rounded-lg p-6 w-full max-w-4xl mx-4" style="background: var(--bg-card);">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">👥 Manage Users</h2>
        <button @click="$emit('close')" class="text-xl hover:opacity-70" style="color: var(--text-2);">✕</button>
      </div>

      <!-- Top bar: Search + Register Staff -->
      <div class="flex gap-3 mb-5">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Search by name, email or role..."
          class="input-field flex-1"
        />
        <button
          @click="showForm = !showForm"
          class="px-4 py-2 rounded-lg font-medium text-white whitespace-nowrap"
          style="background: var(--accent-admin);"
        >
          ➕ Register Staff
        </button>
      </div>

      <!-- Register Staff Form -->
      <div v-if="showForm" class="mb-5 p-4 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
        <h3 class="font-semibold mb-3" style="color: var(--text-1);">New Staff Registration</h3>
        <form @submit.prevent="registerStaff" class="grid grid-cols-2 gap-3">
          <input v-model="newStaff.name" type="text" placeholder="Full Name" required class="input-field" />
          <input v-model="newStaff.email" type="email" placeholder="Email" required class="input-field" />
          <input v-model="newStaff.phone" type="tel" placeholder="Phone (optional)" class="input-field" />
          <input v-model="newStaff.password" type="password" placeholder="Password" required minlength="6" class="input-field" />
          <select v-model="newStaff.role" required class="input-field col-span-2">
            <option value="">Select Role</option>
            <option value="judge">Judge</option>
            <option value="admin">Admin</option>
          </select>
          <div class="col-span-2 flex items-center gap-3">
            <button type="submit" class="px-4 py-2 rounded-lg text-white font-medium" style="background: var(--accent-admin);">
              Register
            </button>
            <button type="button" @click="showForm = false"
              class="px-4 py-2 rounded-lg font-medium"
              style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
              Cancel
            </button>
            <p v-if="formMessage" class="text-sm" :class="formSuccess ? 'text-green-600' : 'text-red-600'">
              {{ formMessage }}
            </p>
          </div>
        </form>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr style="background: var(--bg-hover);">
              <th class="text-left p-3" style="color: var(--text-1);">#</th>
              <th class="text-left p-3" style="color: var(--text-1);">Name</th>
              <th class="text-left p-3" style="color: var(--text-1);">Email</th>
              <th class="text-left p-3" style="color: var(--text-1);">Phone</th>
              <th class="text-left p-3" style="color: var(--text-1);">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="p-6 text-center" style="color: var(--text-3);">No users found</td>
            </tr>
            <tr v-for="(user, index) in filteredUsers" :key="user.id"
              style="border-bottom: 1px solid var(--border);">
              <td class="p-3 text-sm" style="color: var(--text-3);">{{ index + 1 }}</td>
              <td class="p-3 font-medium" style="color: var(--text-1);">{{ user.name }}</td>
              <td class="p-3" style="color: var(--text-2);">{{ user.email }}</td>
              <td class="p-3" style="color: var(--text-2);">{{ user.phone || '—' }}</td>
              <td class="p-3">
                <span class="px-2 py-1 rounded text-xs font-medium" :style="getRoleStyle(user.role)">
                  {{ user.role }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../utils/api'

export default {
  name: 'ManageUsersModal',
  props: {
    show: Boolean,
    users: { type: Array, default: () => [] }
  },
  emits: ['close', 'refresh'],
  data() {
    return {
      search: '',
      showForm: false,
      formMessage: '',
      formSuccess: false,
      newStaff: { name: '', email: '', phone: '', password: '', role: '' }
    }
  },
  computed: {
    filteredUsers() {
      const q = this.search.toLowerCase()
      if (!q) return this.users
      return this.users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      )
    }
  },
  methods: {
    getRoleStyle(role) {
      const styles = {
        judge: 'background: rgba(192, 132, 252, 0.15); color: var(--accent-judge);',
        client: 'background: rgba(20, 184, 166, 0.15); color: var(--accent-client);',
        admin: 'background: rgba(239, 68, 68, 0.15); color: var(--accent-admin);'
      }
      return styles[role] || 'background: var(--bg-hover); color: var(--text-2);'
    },
    async registerStaff() {
      this.formMessage = ''
      try {
        const res = await api.post('/users', this.newStaff)
        this.formMessage = res.data.message
        this.formSuccess = true
        this.newStaff = { name: '', email: '', phone: '', password: '', role: '' }
        this.showForm = false
        this.$emit('refresh')
      } catch (err) {
        this.formMessage = err.response?.data?.message || 'Failed to register staff'
        this.formSuccess = false
      }
    }
  }
}
</script>
