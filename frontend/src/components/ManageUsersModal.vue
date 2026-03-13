<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
<<<<<<< HEAD
        <h2 class="text-xl font-bold" style="color: var(--text-1);">👥 System Users</h2>
=======
        <h2 class="text-xl font-bold" style="color: var(--text-1);">👥 Manage Users</h2>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div class="mb-4">
        <button @click="showAddUser = true" class="px-4 py-2 rounded-lg font-medium" style="background: var(--accent-client); color: white;">
<<<<<<< HEAD
          ➕ Add New Staff
=======
          ➕ Add New User
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr style="background: var(--bg-hover);">
              <th class="text-left p-3" style="color: var(--text-1);">Name</th>
              <th class="text-left p-3" style="color: var(--text-1);">Email</th>
              <th class="text-left p-3" style="color: var(--text-1);">Role</th>
<<<<<<< HEAD
              <th class="text-left p-3" style="color: var(--text-1);">Staff ID</th>
=======
              <th class="text-left p-3" style="color: var(--text-1);">Status</th>
              <th class="text-left p-3" style="color: var(--text-1);">Actions</th>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
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
<<<<<<< HEAD
              <td class="p-3" style="color: var(--text-2);">
                {{ user.role === 'admin' ? user.staff_id || '-' : '-' }}
=======
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
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
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
<<<<<<< HEAD
            <input v-model="newUser.phone" type="tel" placeholder="Phone (Optional)" class="input-field" />
            <select v-model="newUser.role" required class="input-field" @change="newUser.staffId = ''">
              <option value="">Select Role</option>
              <option value="judge">Judge</option>
              <option value="admin">Admin</option>
            </select>
            
            <!-- Staff ID field for Admin -->
            <div v-if="newUser.role === 'admin'" class="space-y-1">
              <label style="color: var(--text-2); font-size: 0.875rem; font-weight: 500;">
                Staff ID (e.g., ADN-001)
              </label>
              <input 
                v-model="newUser.staffId" 
                type="text" 
                placeholder="ADN-001" 
                required 
                class="input-field"
                @input="validateStaffId"
              />
              <p v-if="staffIdError" style="color: #ef4444; font-size: 0.75rem;">
                {{ staffIdError }}
              </p>
            </div>
            
            <input v-model="newUser.password" type="password" placeholder="Password" required minlength="6" class="input-field" />
=======
            <select v-model="newUser.role" required class="input-field">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="judge">Judge</option>
              <option value="client">Client</option>
            </select>
            <input v-model="newUser.password" type="password" placeholder="Password" required class="input-field" />
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
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
<<<<<<< HEAD
import api from '../utils/api'

=======
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
export default {
  name: 'ManageUsersModal',
  props: {
    show: Boolean,
    users: Array
  },
  data() {
    return {
      showAddUser: false,
<<<<<<< HEAD
      staffIdError: '',
      newUser: {
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        staffId: ''
=======
      newUser: {
        name: '',
        email: '',
        role: '',
        password: ''
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
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
<<<<<<< HEAD
    validateStaffId() {
      this.staffIdError = ''
      if (!this.newUser.staffId.startsWith('ADN-')) {
        this.staffIdError = 'Staff ID must start with ADN-'
      }
    },
    async addUser() {
      if (this.newUser.role === 'admin' && this.staffIdError) {
        return
      }
      try {
        await api.post('/users', {
          name: this.newUser.name,
          email: this.newUser.email,
          phone: this.newUser.phone || null,
          role: this.newUser.role,
          password: this.newUser.password,
          staffId: this.newUser.role === 'admin' ? this.newUser.staffId : null
        })
        this.$emit('user-added')
        this.newUser = { name: '', email: '', phone: '', role: '', password: '', staffId: '' }
        this.showAddUser = false
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to add user')
      }
    },
    async editUser(user) {
      const newName = prompt('Edit name:', user.name)
      if (!newName) return
      try {
        await api.put(`/users/${user.id}`, {
          name: newName,
          email: user.email,
          phone: user.phone,
          role: user.role
        })
        this.$emit('user-added')
        alert('User updated successfully')
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to edit user')
      }
    },
    async toggleUserStatus(user) {
      try {
        await api.patch(`/users/${user.id}/toggle-status`)
        this.$emit('user-added')
        alert(`User ${user.active ? 'deactivated' : 'activated'} successfully`)
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to toggle user status')
      }
    }
  },
  emits: ['close', 'user-added', 'edit-user', 'toggle-status']
=======
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
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
}
</script>