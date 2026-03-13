<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">👥 Manage Users</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div class="mb-4">
        <button @click="showAddUser = true" class="px-4 py-2 rounded-lg font-medium" style="background: var(--accent-client); color: white;">
          ➕ Add New User
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr style="background: var(--bg-hover);">
              <th class="text-left p-3" style="color: var(--text-1);">Name</th>
              <th class="text-left p-3" style="color: var(--text-1);">Email</th>
              <th class="text-left p-3" style="color: var(--text-1);">Role</th>
              <th class="text-left p-3" style="color: var(--text-1);">Status</th>
              <th class="text-left p-3" style="color: var(--text-1);">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid var(--border);">
              <td class="p-3" style="color: var(--text-1);">{{ user.name }}</td>
              <td class="p-3" style="color: var(--text-2);">{{ user.email }}</td>
              <td class="p-3">
                <span class="px-2 py-1 rounded text-xs" 
                      :style="getRoleStyle(user.role)">
                  {{ user.role }}
                </span>
              </td>
              <td class="p-3">
                <span class="px-2 py-1 rounded text-xs"
                      :class="user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3">
                <div class="flex gap-2">
                  <button @click="editUser(user)" class="px-2 py-1 rounded text-xs" style="background: var(--accent-judge); color: white;">
                    Edit
                  </button>
                  <button @click="toggleUserStatus(user)" class="px-2 py-1 rounded text-xs" 
                          :style="user.active ? 'background: var(--accent-admin); color: white;' : 'background: var(--accent-client); color: white;'">
                    {{ user.active ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Add User Form -->
      <div v-if="showAddUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" style="background: var(--bg-card);">
          <h3 class="text-lg font-bold mb-4" style="color: var(--text-1);">Add New User</h3>
          <form @submit.prevent="addUser" class="space-y-4">
            <input v-model="newUser.name" type="text" placeholder="Full Name" required class="input-field" />
            <input v-model="newUser.email" type="email" placeholder="Email" required class="input-field" />
            <select v-model="newUser.role" required class="input-field">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="judge">Judge</option>
              <option value="client">Client</option>
            </select>
            <input v-model="newUser.password" type="password" placeholder="Password" required class="input-field" />
            <div class="flex gap-3">
              <button type="submit" class="flex-1 px-4 py-2 rounded-lg" style="background: var(--accent-client); color: white;">
                Add User
              </button>
              <button type="button" @click="showAddUser = false" class="flex-1 px-4 py-2 rounded-lg" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageUsersModal',
  props: {
    show: Boolean,
    users: Array
  },
  data() {
    return {
      showAddUser: false,
      newUser: {
        name: '',
        email: '',
        role: '',
        password: ''
      }
    }
  },
  methods: {
    getRoleStyle(role) {
      const styles = {
        admin: 'background: rgba(251, 113, 133, 0.15); color: var(--accent-admin);',
        judge: 'background: rgba(192, 132, 252, 0.15); color: var(--accent-judge);',
        client: 'background: rgba(67, 233, 123, 0.15); color: var(--accent-client);'
      }
      return styles[role] || 'background: var(--bg-hover); color: var(--text-2);'
    },
    addUser() {
      this.$emit('add-user', this.newUser)
      this.newUser = { name: '', email: '', role: '', password: '' }
      this.showAddUser = false
    },
    editUser(user) {
      this.$emit('edit-user', user)
    },
    toggleUserStatus(user) {
      this.$emit('toggle-status', user)
    }
  },
  emits: ['close', 'add-user', 'edit-user', 'toggle-status']
}
</script>