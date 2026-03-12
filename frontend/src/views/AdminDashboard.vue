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
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4" style="background: linear-gradient(135deg, var(--accent-admin), #fb7185);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase; letter-spacing: 0.5px;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" style="background: rgba(255, 101, 132, 0.15); color: var(--accent-admin);">Administrator</span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button @click="showManageUsers = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">👥 Manage Users</span>
          </button>
          <button @click="showSystemSettings = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">⚙️ System Settings</span>
          </button>
          <button @click="showReports = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">📊 Reports</span>
          </button>
          <button @click="logout" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🚪 Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Stats Cards -->
      <section class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="card text-center">
          <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
          <p class="text-sm text-gray-600">Pending</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-green-600">{{ stats.approved }}</p>
          <p class="text-sm text-gray-600">Approved</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-red-600">{{ stats.rejected }}</p>
          <p class="text-sm text-gray-600">Rejected</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-blue-600">{{ stats.rescheduled }}</p>
          <p class="text-sm text-gray-600">Rescheduled</p>
        </div>
        <div class="card text-center">
          <p class="text-3xl font-bold text-gray-600">{{ stats.completed }}</p>
          <p class="text-sm text-gray-600">Completed</p>
        </div>
      </section>

      <div class="grid md:grid-cols-3 gap-6">
        
        <!-- Appointments List -->
        <section class="md:col-span-1 card">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">📋 All Appointments</h2>
            <button 
              @click="showDeleted = !showDeleted" 
              class="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              {{ showDeleted ? 'Active' : 'Deleted' }}
            </button>
          </div>
          
          <div class="mb-4">
            <select v-model="filterStatus" class="input-field focus:ring-admin text-sm">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div v-if="currentAppointments.length === 0" class="text-gray-500 text-center py-8">
            {{ showDeleted ? 'No deleted appointments' : 'No appointments found' }}
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="apt in currentAppointments"
              :key="apt.id"
              @click="selectAppointment(apt)"
              :class="selectedAppointment?.id === apt.id ? 'bg-admin text-white' : 'bg-gray-100 hover:bg-gray-200'"
              class="w-full text-left p-3 rounded-lg transition-colors"
            >
              <p class="font-semibold text-sm">{{ apt.service }}</p>
              <p class="text-xs opacity-80">{{ apt.client_name || 'No client name' }}</p>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs opacity-70">📅 {{ apt.date }}</span>
                <span :class="getStatusClass(apt.status)" class="px-2 py-0.5 rounded text-xs">
                  {{ apt.status }}
                </span>
              </div>
              <p v-if="showDeleted && apt.deleted_at" class="text-xs opacity-70 mt-1">🗑️ Deleted: {{ apt.deleted_at }}</p>
            </button>
          </div>
        </section>

        <!-- Appointment Details & Actions -->
        <section class="md:col-span-2 card">
          <div v-if="!selectedAppointment" class="text-gray-500 text-center py-16">
            Select an appointment to manage
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4">📁 Appointment Details</h2>
            
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border border-gray-200">
                <p class="text-gray-900"><strong class="text-gray-900">Service:</strong> {{ selectedAppointment.service }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Client:</strong> {{ selectedAppointment.client_name || 'No client name' }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Email:</strong> {{ selectedAppointment.client_email || 'No email' }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Date:</strong> {{ selectedAppointment.date }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Status:</strong> 
                  <span :class="getStatusClass(selectedAppointment.status)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ selectedAppointment.status }}
                  </span>
                </p>
                <p v-if="selectedAppointment.description" class="mt-2 text-gray-900">
                  <strong class="text-gray-900">Description:</strong> {{ selectedAppointment.description }}
                </p>
              </div>

              <!-- Documents -->
              <div>
                <h3 class="font-semibold mb-2">📄 Client Documents</h3>
                <div v-if="selectedAppointment.documents?.length" class="space-y-2">
                  <a
                    v-for="(doc, idx) in selectedAppointment.documents"
                    :key="idx"
                    :href="doc.url"
                    target="_blank"
                    class="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    📎 {{ doc.name }}
                  </a>
                </div>
                <p v-else class="text-gray-500">No documents uploaded</p>
              </div>

              <!-- Admin Actions -->
              <div v-if="!showDeleted" class="border-t pt-4">
                <h3 class="font-semibold mb-3">⚙️ Admin Actions</h3>
                
                <div class="space-y-3">
                  <!-- Approve -->
                  <button 
                    v-if="selectedAppointment.status === 'Pending'"
                    @click="updateStatus('Approved')" 
                    class="w-full btn-primary bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                  >
                    ✅ Approve Appointment
                  </button>

                  <!-- Reject -->
                  <div v-if="selectedAppointment.status === 'Pending'">
                    <input
                      v-model="rejectReason"
                      type="text"
                      placeholder="Reason for rejection..."
                      class="input-field focus:ring-admin mb-2"
                    />
                    <button 
                      @click="updateStatus('Rejected')" 
                      class="w-full btn-primary bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                    >
                      ❌ Reject Appointment
                    </button>
                  </div>

                  <!-- Reschedule -->
                  <div>
                    <label class="block text-sm font-medium mb-1">Reschedule to:</label>
                    <div class="flex gap-2">
                      <input
                        v-model="newDate"
                        type="date"
                        class="input-field focus:ring-admin flex-1"
                      />
                      <button @click="reschedule" class="btn-admin">📅 Reschedule</button>
                    </div>
                  </div>

                  <!-- Assign Judge -->
                  <div v-if="selectedAppointment.status === 'Approved'">
                    <label class="block text-sm font-medium mb-1">Assign Judge:</label>
                    <div class="flex gap-2">
                      <select v-model="assignedJudge" class="input-field focus:ring-admin flex-1">
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
                    class="w-full btn-primary bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
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
    </main>

    <!-- Modals -->
    <div v-if="showManageUsers" @click="showManageUsers = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">👥 Manage Users</h3>
          <button @click="showManageUsers = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3">
          <div v-for="judge in judges" :key="judge.id" class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="font-semibold" style="color: var(--text-1);">{{ judge.name }}</p>
            <p class="text-sm" style="color: var(--text-2);">{{ judge.email }}</p>
            <span class="text-xs px-2 py-1 rounded" style="background: rgba(167, 139, 250, 0.15); color: var(--accent-judge);">Judge</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSystemSettings" @click="showSystemSettings = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">⚙️ System Settings</h3>
          <button @click="showSystemSettings = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3" style="color: var(--text-2);">
          <p>🔔 Notifications: Enabled</p>
          <p>📧 Email Alerts: Active</p>
          <p>🔒 Security: 2FA Disabled</p>
          <p>🌐 Language: English</p>
        </div>
      </div>
    </div>

    <div v-if="showReports" @click="showReports = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📊 Reports</h3>
          <button @click="showReports = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3" style="color: var(--text-2);">
          <p>📈 Total Appointments: {{ appointments.length }}</p>
          <p>✅ Completed: {{ stats.completed }}</p>
          <p>⏳ Pending: {{ stats.pending }}</p>
          <p>📅 This Month: {{ appointments.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
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
    const showSystemSettings = ref(false)
    const showReports = ref(false)

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

    const currentAppointments = computed(() => {
      if (showDeleted.value) return deletedAppointments.value
      return filteredAppointments.value
    })

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

    const selectAppointment = (apt) => {
      selectedAppointment.value = apt
      rejectReason.value = ''
      newDate.value = ''
      assignedJudge.value = apt.assignedJudge || ''
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
      localStorage.clear()
      router.push('/login')
    }

    onMounted(() => {
      fetchAppointments()
      fetchJudges()
      fetchDeletedAppointments()
    })

    return { 
      user,
      appointments, 
      deletedAppointments,
      selectedAppointment, 
      filterStatus, 
      showDeleted,
      filteredAppointments,
      currentAppointments,
      stats,
      rejectReason, 
      newDate, 
      assignedJudge,
      judges,
      message, 
      messageClass,
      showManageUsers,
      showSystemSettings,
      showReports,
      selectAppointment, 
      updateStatus, 
      reschedule,
      assignJudge,
      getStatusClass, 
      logout 
    }
  }
}
</script>
