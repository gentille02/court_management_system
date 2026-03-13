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
              {{ authStore.user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ authStore.user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ authStore.user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(255, 101, 132, 0.15); color: var(--accent-admin);">
                Administrator
              </span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button 
            @click="showManageUsers = true" 
            class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
          >
            <span class="text-sm font-medium">👥 System Users</span>
          </button>
          <button 
            @click="showReports = true" 
            class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
          >
            <span class="text-sm font-medium">📊 Reports</span>
          </button>
          <button 
            @click="logout" 
            class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
          >
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
            <button
              @click="toggleDeletedView"
              class="text-sm px-3 py-1 rounded transition-all hover:opacity-80"
              style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);"
            >
              {{ showDeleted ? 'Active' : 'Cancelled' }}
            </button>
          </div>

          <!-- Filter -->
          <div class="mb-4">
            <label for="filter-status" class="sr-only">Filter by status</label>
            <select 
              id="filter-status"
              v-model="filterStatus" 
              class="input-field text-sm"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <!-- Loading state -->
          <div v-if="appointmentStore.loading" class="text-center py-8" style="color: var(--text-3);">
            Loading...
          </div>

          <div v-else-if="currentAppointments.length === 0" 
               class="text-center py-8" style="color: var(--text-3);">
            {{ showDeleted ? 'No cancelled appointments' : 'No appointments found' }}
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="apt in currentAppointments"
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
                <span :class="getStatusClass(apt.status)" class="px-2 py-0.5 rounded text-xs">
                  {{ apt.status }}
                </span>
              </div>
            </button>
          </div>
        </section>

        <!-- Appointment Details & Actions -->
        <section class="md:col-span-2 card" aria-label="Appointment Details">
          <div v-if="!selectedAppointment" 
               class="text-center py-16" style="color: var(--text-3);">
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
                  <span :class="getStatusClass(selectedAppointment.status)" 
                        class="px-2 py-1 rounded text-xs font-semibold ml-1">
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
                    @click="handleUpdateStatus('Approved')"
                    :disabled="appointmentStore.loading"
                    class="w-full btn-primary"
                    style="background: #16a34a; color: white;"
                  >
                    ✅ Approve Appointment
                  </button>

                  <!-- Reject -->
                  <div v-if="selectedAppointment.status === 'Pending'">
                    <label for="reject-reason" class="block text-sm font-medium mb-1"
                           style="color: var(--text-2);">Reason for rejection</label>
                    <input
                      id="reject-reason"
                      v-model="rejectReason"
                      type="text"
                      placeholder="Reason for rejection..."
                      class="input-field mb-2"
                    />
                    <button
                      @click="handleUpdateStatus('Rejected')"
                      :disabled="appointmentStore.loading"
                      class="w-full btn-primary"
                      style="background: #dc2626; color: white;"
                    >
                      ❌ Reject Appointment
                    </button>
                  </div>

                  <!-- Reschedule -->
                  <div>
                    <label for="new-date" class="block text-sm font-medium mb-1"
                           style="color: var(--text-2);">Reschedule to:</label>
                    <div class="flex gap-2">
                      <input
                        id="new-date"
                        v-model="newDate"
                        type="date"
                        class="input-field flex-1"
                      />
                      <button 
                        @click="handleReschedule" 
                        :disabled="appointmentStore.loading"
                        class="btn-admin"
                      >
                        📅 Reschedule
                      </button>
                    </div>
                  </div>

                  <!-- Assign Judge -->
                  <div v-if="selectedAppointment.status === 'Approved'">
                    <label for="assign-judge" class="block text-sm font-medium mb-1"
                           style="color: var(--text-2);">Assign Judge:</label>
                    <div class="flex gap-2">
                      <select 
                        id="assign-judge"
                        v-model="assignedJudge" 
                        class="input-field flex-1"
                      >
                        <option value="">Select Judge</option>
                        <option v-for="judge in judges" :key="judge.id" :value="judge.id">
                          {{ judge.name }}
                        </option>
                      </select>
                      <button 
                        @click="handleAssignJudge" 
                        :disabled="appointmentStore.loading"
                        class="btn-admin"
                      >
                        Assign
                      </button>
                    </div>
                  </div>

                  <!-- Complete -->
                  <button
                    v-if="selectedAppointment.status === 'Approved' || selectedAppointment.status === 'Rescheduled'"
                    @click="handleUpdateStatus('Completed')"
                    :disabled="appointmentStore.loading"
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

      <!-- Feedback Messages -->
      <p v-if="appointmentStore.error" 
         class="mt-4 p-3 rounded-lg text-center bg-red-100 text-red-800" 
         role="alert">
        ❌ {{ appointmentStore.error }}
      </p>
      <p v-if="successMessage" 
         class="mt-4 p-3 rounded-lg text-center bg-green-100 text-green-800" 
         role="alert">
        ✅ {{ successMessage }}
      </p>
    </main>

    <!-- Manage Users Modal -->
    <ManageUsersModal
      :show="showManageUsers"
      :users="allUsers"
      @close="showManageUsers = false"
      @user-added="async () => { await fetchAllUsers(); await fetchJudges(); }"
    />

    <!-- Reports Modal -->
    <div v-if="showReports" 
         @click="showReports = false" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="rounded-lg p-6 max-w-md w-full mx-4"
           style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📊 Reports</h3>
          <button @click="showReports = false" 
                  class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3" style="color: var(--text-2);">
          <p>📈 Total Appointments: {{ appointmentStore.appointments.length }}</p>
          <p>✅ Completed: {{ stats.completed }}</p>
          <p>⏳ Pending: {{ stats.pending }}</p>
          <p>❌ Rejected: {{ stats.rejected }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAppointmentStore } from '../stores/appointment'
import { useStatusClass } from '../composables/useStatusClass'
import ManageUsersModal from '../components/ManageUsersModal.vue'
import api from '../utils/api'

export default {
  name: 'AdminDashboard',
  components: { ManageUsersModal },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const appointmentStore = useAppointmentStore()
    const { getStatusClass } = useStatusClass()

    const selectedAppointment = ref(null)
    const filterStatus = ref('')
    const showDeleted = ref(false)
    const deletedAppointments = ref([])
    const rejectReason = ref('')
    const newDate = ref('')
    const assignedJudge = ref('')
    const judges = ref([])
    const allUsers = ref([])
    const successMessage = ref('')

    // Modal visibility
    const showManageUsers = ref(false)
    const showReports = ref(false)

    // Stats computed from store
    const stats = computed(() => ({
      pending: appointmentStore.appointments.filter(a => a.status === 'Pending').length,
      approved: appointmentStore.appointments.filter(a => a.status === 'Approved').length,
      rejected: appointmentStore.appointments.filter(a => a.status === 'Rejected').length,
      rescheduled: appointmentStore.appointments.filter(a => a.status === 'Rescheduled').length,
      completed: appointmentStore.appointments.filter(a => a.status === 'Completed').length
    }))

    const filteredAppointments = computed(() => {
      if (!filterStatus.value) return appointmentStore.appointments
      return appointmentStore.appointments.filter(a => a.status === filterStatus.value)
    })

    const currentAppointments = computed(() =>
      showDeleted.value ? deletedAppointments.value : filteredAppointments.value
    )

    const toggleDeletedView = async () => {
      showDeleted.value = !showDeleted.value
      if (showDeleted.value && deletedAppointments.value.length === 0) {
        await fetchDeletedAppointments()
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

    const fetchJudges = async () => {
      try {
        const response = await api.get('/users/judges')
        judges.value = response.data
      } catch (err) {
        console.error('Failed to fetch judges', err)
      }
    }

    const fetchAllUsers = async () => {
      try {
        const response = await api.get('/users')
        allUsers.value = response.data
      } catch (err) {
        console.error('Failed to fetch users', err)
      }
    }

    const selectAppointment = (apt) => {
      selectedAppointment.value = apt
      rejectReason.value = ''
      newDate.value = ''
      assignedJudge.value = apt.assignedJudge || ''
    }

    const handleUpdateStatus = async (status) => {
      if (status === 'Rejected' && !rejectReason.value) {
        return
      }
      try {
        await appointmentStore.updateStatus(
          selectedAppointment.value.id,
          status,
          status === 'Rejected' ? rejectReason.value : undefined
        )
        successMessage.value = `Appointment ${status.toLowerCase()} successfully`
        selectedAppointment.value = null
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch {
        // error shown from store
      }
    }

    const handleReschedule = async () => {
      if (!newDate.value) return
      try {
        await appointmentStore.reschedule(selectedAppointment.value.id, newDate.value)
        await appointmentStore.fetchAllAppointments()
        successMessage.value = 'Appointment rescheduled successfully'
        newDate.value = ''
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch {
        // error shown from store
      }
    }

    const handleAssignJudge = async () => {
      if (!assignedJudge.value) return
      try {
        await api.patch(`/appointments/${selectedAppointment.value.id}/assign`, {
          judgeId: assignedJudge.value
        })
        await appointmentStore.fetchAllAppointments()
        successMessage.value = 'Judge assigned successfully'
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch (err) {
        console.error('Failed to assign judge', err)
      }
    }

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    onMounted(async () => {
      // Ensure user data is loaded
      if (!authStore.user) {
        await authStore.fetchCurrentUser()
      }
      appointmentStore.fetchAllAppointments()
      fetchJudges()
      fetchAllUsers()
    })

    return {
      authStore,
      appointmentStore,
      selectedAppointment,
      filterStatus,
      showDeleted,
      currentAppointments,
      stats,
      rejectReason,
      newDate,
      assignedJudge,
      judges,
      allUsers,
      successMessage,
      showManageUsers,
      showReports,
      getStatusClass,
      toggleDeletedView,
      selectAppointment,
      handleUpdateStatus,
      handleReschedule,
      handleAssignJudge,
      logout
    }
  }
}
</script>