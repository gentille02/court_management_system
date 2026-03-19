<template>
  <div class="flex min-h-screen" style="background: var(--bg-base);">
    <!-- Sidebar -->
    <aside class="w-1/4 min-h-screen sticky top-0" style="background: var(--bg-panel); border-right: 1px solid var(--border);">
      <div class="p-6">
        <!-- Logo -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="text-4xl">⚖️</div>
          <h1 class="text-3xl font-bold" style="font-family: 'Syne', sans-serif; color: var(--text-1);">CMS</h1>
        </div>

        <!-- Profile Card -->
        <div class="mb-6" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                 style="background: linear-gradient(135deg, var(--accent-admin), #fb7185);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-2" style="color: var(--text-3);">{{ user?.email }}</p>
            <p v-if="user?.phone" class="text-sm mb-2" style="color: var(--text-3);">📞 {{ user?.phone }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(255, 101, 132, 0.15); color: var(--accent-admin);">
                Administrator
              </span>
            </div>
            <button @click="openEditProfile" class="mt-4 w-full px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">✏️ Edit Profile</button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button @click="goHome" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80 flex items-center"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🏠 Home</span>
          </button>
          <button @click="showManageUsers = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">👥 Manage Users</span>
          </button>
          <button @click="showReports = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">📊 Reports</span>
          </button>
          <button @click="logout" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🚪 Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Stats Cards -->
      <section aria-label="Appointment Statistics" class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="card text-center">
          <p class="text-3xl font-bold text-yellow-400">{{ stats.pending }}</p>
          <p class="text-sm" style="color: var(--text-2);">Pending</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-green-400">{{ stats.approved }}</p>
          <p class="text-sm" style="color: var(--text-2);">Approved</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold" style="color: var(--accent-admin);">{{ stats.rejected }}</p>
          <p class="text-sm" style="color: var(--text-2);">Rejected</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-blue-400">{{ stats.rescheduled }}</p>
          <p class="text-sm" style="color: var(--text-2);">Rescheduled</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold" style="color: var(--text-2);">{{ stats.completed }}</p>
          <p class="text-sm" style="color: var(--text-2);">Completed</p>
        </div>
      </section>

      <div class="grid md:grid-cols-3 gap-6">

        <!-- Appointments List -->
        <section class="md:col-span-1 card" aria-label="Appointments List">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold" style="color: var(--text-1);">📋 All Appointments</h2>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 rounded-full text-xs font-semibold" style="background: var(--bg-hover); color: var(--text-2);">{{ currentAppointments.length }}</span>
              <button
                @click="toggleDeletedView"
                class="text-sm px-3 py-1 rounded transition-all hover:opacity-80"
                style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);"
              >
                {{ showDeleted ? 'Active' : 'Cancelled' }}
              </button>
            </div>
          </div>

          <input v-model="aptSearch" type="text" placeholder="🔍 Search by client or service..." class="input-field mb-3 text-sm" />

          <div class="mb-4">
            <label for="filter-status" class="sr-only">Filter by status</label>
            <select id="filter-status" v-model="filterStatus" class="input-field text-sm">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div v-if="searchedAppointments.length === 0" class="text-center py-8" style="color: var(--text-3);">
            {{ showDeleted ? 'No cancelled appointments' : 'No appointments found' }}
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="apt in searchedAppointments"
              :key="apt.id"
              @click="selectAppointment(apt)"
              class="w-full text-left p-3 rounded-lg transition-colors"
              :style="selectedAppointment?.id === apt.id
                ? 'background: var(--accent-admin); color: white;'
                : 'background: var(--bg-hover); color: var(--text-1);'"
            >
              <p class="font-semibold text-sm">{{ apt.service }}</p>
              <p class="text-xs opacity-80">{{ apt.client_name || 'No client name' }}</p>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs opacity-70">📅 {{ apt.date }}</span>
                <span :class="getStatusClass(apt.status)" class="px-2 py-0.5 rounded text-xs font-semibold">
                  {{ apt.status }}
                </span>
              </div>
              <p v-if="showDeleted && apt.deleted_at" class="text-xs opacity-70 mt-1">❌ Cancelled: {{ apt.deleted_at }}</p>
            </button>
          </div>
        </section>

        <!-- Appointment Details & Actions -->
        <section class="md:col-span-2 card" aria-label="Appointment Details">
          <div v-if="!selectedAppointment" class="text-center py-16" style="color: var(--text-3);">
            Select an appointment to manage
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">📁 Appointment Details</h2>

            <div class="space-y-4">
              <!-- Details -->
              <div class="p-4 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
                <p style="color: var(--text-1);"><strong>Service:</strong> {{ selectedAppointment.service }}</p>
                <p style="color: var(--text-1);"><strong>Client:</strong> {{ selectedAppointment.client_name || 'No client name' }}</p>
                <p style="color: var(--text-1);"><strong>Email:</strong> {{ selectedAppointment.client_email || 'No email' }}</p>
                <p style="color: var(--text-1);"><strong>Date:</strong> {{ selectedAppointment.date }}</p>
                <p style="color: var(--text-1);">
                  <strong>Status:</strong>
                  <span :class="getStatusClass(selectedAppointment.status)" class="px-2 py-1 rounded text-xs font-semibold ml-1">
                    {{ selectedAppointment.status }}
                  </span>
                </p>
                <p v-if="selectedAppointment.description" class="mt-2" style="color: var(--text-2);">
                  <strong style="color: var(--text-1);">Description:</strong> {{ selectedAppointment.description }}
                </p>
              </div>

              <!-- Documents -->
              <div>
                <h3 class="font-semibold mb-2" style="color: var(--text-1);">📄 Client Documents</h3>
                <div v-if="selectedAppointment.documents?.length" class="space-y-2">
                  <a
                    v-for="(doc, idx) in selectedAppointment.documents"
                    :key="idx"
                    :href="doc.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block p-3 rounded-lg transition-colors hover:opacity-80"
                    style="background: var(--bg-hover); color: var(--accent-judge); border: 1px solid var(--border);"
                  >
                    📎 {{ doc.name }}
                  </a>
                </div>
                <p v-else style="color: var(--text-3);">No documents uploaded</p>
              </div>

              <!-- Admin Actions -->
              <div v-if="!showDeleted" class="border-t pt-4" style="border-color: var(--border);">
                <h3 class="font-semibold mb-3" style="color: var(--text-1);">⚙️ Admin Actions</h3>

                <div class="space-y-3">
                  <!-- Approve -->
                  <button
                    v-if="selectedAppointment.status === 'Pending'"
                    @click="updateStatus('Approved')"
                    class="w-full btn-primary"
                    style="background: #16a34a; color: white;"
                  >
                    ✅ Approve Appointment
                  </button>

                  <!-- Reject -->
                  <div v-if="selectedAppointment.status === 'Pending'">
                    <label for="reject-reason" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Reason for rejection</label>
                    <input
                      id="reject-reason"
                      v-model="rejectReason"
                      type="text"
                      placeholder="Reason for rejection..."
                      class="input-field mb-2"
                    />
                    <button
                      @click="updateStatus('Rejected')"
                      class="w-full btn-primary"
                      style="background: #dc2626; color: white;"
                    >
                      ❌ Reject Appointment
                    </button>
                  </div>

                  <!-- Reschedule -->
                  <div>
                    <label for="new-date" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Reschedule to:</label>
                    <div class="flex gap-2">
                      <input id="new-date" v-model="newDate" type="date" class="input-field flex-1" />
                      <button @click="reschedule" class="btn-admin">📅 Reschedule</button>
                    </div>
                  </div>

                  <!-- Assign Judge -->
                  <div v-if="selectedAppointment.status === 'Approved'">
                    <label for="assign-judge" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Assign Judge:</label>
                    <div class="flex gap-2">
                      <select id="assign-judge" v-model="assignedJudge" class="input-field flex-1">
                        <option value="">Select Judge</option>
                        <option v-for="judge in judges" :key="judge.id" :value="judge.id">
                          {{ judge.name }}
                        </option>
                      </select>
                      <button @click="assignJudge" class="btn-admin">Assign</button>
                    </div>
                  </div>

                  <!-- Complete -->
                  <button
                    v-if="selectedAppointment.status === 'Approved' || selectedAppointment.status === 'Rescheduled'"
                    @click="updateStatus('Completed')"
                    class="w-full btn-primary"
                    style="background: #4b5563; color: white;"
                  >
                    ✔️ Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <p v-if="message" :class="messageClass" class="mt-4 p-3 rounded-lg text-center" role="alert">
        {{ message }}
      </p>

      <!-- Footer -->
      <footer class="mt-10 pt-4 text-center text-xs" style="color: var(--text-3); border-top: 1px solid var(--border);">
        © {{ new Date().getFullYear() }} Court Management System. All rights reserved.
      </footer>
    </main>

    <!-- Manage Users Modal -->
    <ManageUsersModal
      :show="showManageUsers"
      :users="allUsers"
      @close="showManageUsers = false"
      @refresh="fetchAllUsers(); fetchJudges();"
    />

    <!-- Reports Modal -->
    <div v-if="showReports" @click="showReports = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📊 Reports</h3>
          <button @click="showReports = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3" style="color: var(--text-2);">
          <p>📈 Total Appointments: {{ appointments.length }}</p>
          <p>✅ Completed: {{ stats.completed }}</p>
          <p>🟢 Approved: {{ stats.approved }}</p>
          <p>⏳ Pending: {{ stats.pending }}</p>
          <p>❌ Rejected: {{ stats.rejected }}</p>
          <p>📅 Rescheduled: {{ stats.rescheduled }}</p>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditProfile" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="rounded-lg p-6 w-full max-w-md mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold" style="color: var(--text-1);">✏️ Edit Profile</h3>
          <button @click="showEditProfile = false" class="text-xl hover:opacity-70" style="color: var(--text-2);">✕</button>
        </div>
        <form @submit.prevent="saveProfile" class="space-y-3">
          <div>
            <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Email</label>
            <input v-model="profileForm.email" type="email" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Phone</label>
            <input v-model="profileForm.phone" type="tel" placeholder="Phone number" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">New Password <span style="color: var(--text-3); font-weight: 400;">(leave blank to keep current)</span></label>
            <input v-model="profileForm.password" type="password" minlength="6" placeholder="New password" class="input-field" />
          </div>
          <p v-if="profileMessage" class="text-sm" :class="profileSuccess ? 'text-green-600' : 'text-red-600'">{{ profileMessage }}</p>
          <div class="flex gap-3 pt-1">
            <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-medium" style="background: var(--accent-admin);">Save Changes</button>
            <button type="button" @click="showEditProfile = false" class="flex-1 px-4 py-2 rounded-lg font-medium" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'
import ManageUsersModal from '../components/ManageUsersModal.vue'

export default {
  name: 'AdminDashboard',
  components: { ManageUsersModal },
  setup() {
    const router = useRouter()
    const user = ref(JSON.parse(sessionStorage.getItem('user') || '{}'))
    const appointments = ref([])
    const deletedAppointments = ref([])
    const selectedAppointment = ref(null)
    const filterStatus = ref('')
    const showDeleted = ref(false)
    const rejectReason = ref('')
    const newDate = ref('')
    const assignedJudge = ref('')
    const judges = ref([])
    const message = ref('')
    const messageClass = ref('')
    const showManageUsers = ref(false)
    const showReports = ref(false)
    const allUsers = ref([])
    const aptSearch = ref('')
    const showEditProfile = ref(false)
    const profileMessage = ref('')
    const profileSuccess = ref(false)
    const profileForm = ref({ email: '', phone: '', password: '' })

    const openEditProfile = () => {
      profileForm.value = { email: user.value.email || '', phone: user.value.phone || '', password: '' }
      profileMessage.value = ''
      showEditProfile.value = true
    }

    const saveProfile = async () => {
      profileMessage.value = ''
      try {
        const payload = { email: profileForm.value.email, phone: profileForm.value.phone }
        if (profileForm.value.password) payload.password = profileForm.value.password
        const res = await api.patch('/users/me', payload)
        user.value = { ...user.value, ...res.data.user }
        sessionStorage.setItem('user', JSON.stringify(user.value))
        profileMessage.value = 'Profile updated successfully!'
        profileSuccess.value = true
      } catch (err) {
        profileMessage.value = err.response?.data?.message || 'Failed to update profile'
        profileSuccess.value = false
      }
    }

    const searchedAppointments = computed(() => {
      const q = aptSearch.value.toLowerCase()
      if (!q) return currentAppointments.value
      return currentAppointments.value.filter(a =>
        a.service?.toLowerCase().includes(q) ||
        a.client_name?.toLowerCase().includes(q)
      )
    })

    const fetchAllUsers = async () => {
      try {
        const res = await api.get('/users')
        allUsers.value = res.data
      } catch (err) {
        console.error('Failed to fetch users', err)
      }
    }

    const stats = computed(() => ({
      pending: appointments.value.filter(a => a.status === 'Pending').length,
      approved: appointments.value.filter(a => a.status === 'Approved').length,
      rejected: appointments.value.filter(a => a.status === 'Rejected').length,
      rescheduled: appointments.value.filter(a => a.status === 'Rescheduled').length,
      completed: appointments.value.filter(a => a.status === 'Completed').length
    }))

    const filteredAppointments = computed(() => {
      if (!filterStatus.value) return appointments.value
      return appointments.value.filter(a => a.status === filterStatus.value)
    })

    const currentAppointments = computed(() =>
      showDeleted.value ? deletedAppointments.value : filteredAppointments.value
    )

    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments')
        appointments.value = response.data
      } catch (err) {
        console.error('Failed to fetch appointments', err)
      }
    }

    const fetchJudges = async () => {
      try {
        const response = await api.get('/users/judges')
        judges.value = response.data
      } catch (err) {
        console.error('Failed to fetch judges', err)
      }
    }

    const fetchDeletedAppointments = async () => {
      try {
        const response = await api.get('/appointments/deleted')
        deletedAppointments.value = response.data
      } catch (err) {
        console.error('Failed to fetch deleted appointments', err)
      }
    }

    const toggleDeletedView = async () => {
      showDeleted.value = !showDeleted.value
      if (showDeleted.value && deletedAppointments.value.length === 0) {
        await fetchDeletedAppointments()
      }
    }

    const selectAppointment = (apt) => {
      selectedAppointment.value = apt
      rejectReason.value = ''
      newDate.value = ''
      assignedJudge.value = apt.judge_id || ''
    }

    const updateStatus = async (status) => {
      if (status === 'Rejected' && !rejectReason.value) {
        message.value = '⚠️ Please provide a reason for rejection'
        messageClass.value = 'bg-yellow-100 text-yellow-800'
        return
      }
      try {
        await api.patch(`/appointments/${selectedAppointment.value.id}/status`, {
          status,
          remarks: status === 'Rejected' ? rejectReason.value : undefined
        })
        message.value = `✅ Appointment ${status.toLowerCase()} successfully`
        messageClass.value = 'bg-green-100 text-green-800'
        fetchAppointments()
      } catch (err) {
        message.value = '❌ Failed to update status'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    const reschedule = async () => {
      if (!newDate.value) {
        message.value = '⚠️ Please select a new date'
        messageClass.value = 'bg-yellow-100 text-yellow-800'
        return
      }
      try {
        await api.patch(`/appointments/${selectedAppointment.value.id}/reschedule`, { date: newDate.value })
        message.value = '✅ Appointment rescheduled successfully'
        messageClass.value = 'bg-green-100 text-green-800'
        newDate.value = ''
        fetchAppointments()
      } catch (err) {
        message.value = '❌ Failed to reschedule'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    const assignJudge = async () => {
      if (!assignedJudge.value) {
        message.value = '⚠️ Please select a judge'
        messageClass.value = 'bg-yellow-100 text-yellow-800'
        return
      }
      try {
        await api.patch(`/appointments/${selectedAppointment.value.id}/assign`, { judgeId: assignedJudge.value })
        message.value = '✅ Judge assigned successfully'
        messageClass.value = 'bg-green-100 text-green-800'
        fetchAppointments()
      } catch (err) {
        message.value = '❌ Failed to assign judge'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    const getStatusClass = (status) => {
      const classes = {
        'Pending': 'bg-yellow-200 text-yellow-900',
        'Approved': 'bg-green-200 text-green-900',
        'Rejected': 'bg-red-200 text-red-900',
        'Rescheduled': 'bg-blue-200 text-blue-900',
        'Completed': 'bg-gray-300 text-gray-900'
      }
      return classes[status] || 'bg-gray-300 text-gray-900'
    }

    const logout = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      router.push('/login')
    }

    const goHome = () => {
      router.push('/')
    }

    onMounted(() => {
      fetchAppointments()
      fetchJudges()
      fetchAllUsers()
    })

    return {
      user,
      appointments,
      deletedAppointments,
      selectedAppointment,
      filterStatus,
      showDeleted,
      currentAppointments,
      stats,
      rejectReason,
      newDate,
      assignedJudge,
      judges,
      message,
      messageClass,
      showManageUsers,
      showReports,
      allUsers,
      fetchAllUsers,
      aptSearch,
      searchedAppointments,
      showEditProfile,
      profileForm,
      profileMessage,
      profileSuccess,
      openEditProfile,
      saveProfile,
      toggleDeletedView,
      selectAppointment,
      updateStatus,
      reschedule,
      assignJudge,
      getStatusClass,
      logout,
      goHome
    }
  }
}
</script>
