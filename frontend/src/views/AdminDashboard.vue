<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-admin text-white p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Administrator Dashboard</h1>
        <button @click="logout" class="px-4 py-2 bg-white text-admin rounded-lg hover:bg-gray-100">Logout</button>
      </div>
    </nav>

    <main class="container mx-auto p-6">
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
          <h2 class="text-xl font-bold mb-4">📋 All Appointments</h2>
          
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

          <div v-if="filteredAppointments.length === 0" class="text-gray-500 text-center py-8">
            No appointments found
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="apt in filteredAppointments"
              :key="apt.id"
              @click="selectAppointment(apt)"
              :class="selectedAppointment?.id === apt.id ? 'bg-admin text-white' : 'bg-gray-100 hover:bg-gray-200'"
              class="w-full text-left p-3 rounded-lg transition-colors"
            >
              <p class="font-semibold text-sm">{{ apt.service }}</p>
              <p class="text-xs opacity-80">{{ apt.clientName }}</p>
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
        <section class="md:col-span-2 card">
          <div v-if="!selectedAppointment" class="text-gray-500 text-center py-16">
            Select an appointment to manage
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4">📁 Appointment Details</h2>
            
            <div class="space-y-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p><strong>Service:</strong> {{ selectedAppointment.service }}</p>
                <p><strong>Client:</strong> {{ selectedAppointment.clientName }}</p>
                <p><strong>Email:</strong> {{ selectedAppointment.clientEmail }}</p>
                <p><strong>Date:</strong> {{ selectedAppointment.date }}</p>
                <p><strong>Status:</strong> 
                  <span :class="getStatusClass(selectedAppointment.status)" class="px-2 py-1 rounded text-xs">
                    {{ selectedAppointment.status }}
                  </span>
                </p>
                <p v-if="selectedAppointment.description" class="mt-2">
                  <strong>Description:</strong> {{ selectedAppointment.description }}
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
              <div class="border-t pt-4">
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
    const appointments = ref([])
    const selectedAppointment = ref(null)
    const filterStatus = ref('')
    const rejectReason = ref('')
    const newDate = ref('')
    const assignedJudge = ref('')
    const judges = ref([])
    const message = ref('')
    const messageClass = ref('')

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
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800',
        'Rescheduled': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-gray-100 text-gray-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const logout = () => {
      localStorage.clear()
      router.push('/login')
    }

    onMounted(() => {
      fetchAppointments()
      fetchJudges()
    })

    return { 
      appointments, 
      selectedAppointment, 
      filterStatus, 
      filteredAppointments,
      stats,
      rejectReason, 
      newDate, 
      assignedJudge,
      judges,
      message, 
      messageClass, 
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
