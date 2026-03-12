<template>
  <div class="flex min-h-screen" style="background: var(--bg-base);">
    <!-- Sidebar -->
    <aside class="w-1/4 min-h-screen sticky top-0" style="background: var(--bg-panel); border-right: 1px solid var(--border);">
      <div class="p-6">
        <!-- CMS Header -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="text-3xl">⚖️</div>
          <h1 class="text-2xl font-bold" style="font-family: 'Syne', sans-serif; color: var(--text-1);">CMS</h1>
        </div>
        
        <!-- Profile Card -->
        <div class="mb-6" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4" style="background: linear-gradient(135deg, var(--accent-client), #2dd4bf);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase; letter-spacing: 0.5px;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" style="background: rgba(67, 233, 123, 0.15); color: var(--accent-client);">Client</span>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-3 mb-6">
          <button @click="showBookingForm = true" class="w-full px-4 py-3 rounded-lg font-medium transition-opacity hover:opacity-90" style="background: var(--accent-client); color: white;">
            📅 Book Appointment
          </button>
          <button @click="showMyAppointments = true" class="w-full px-4 py-3 rounded-lg font-medium transition-opacity hover:opacity-90" style="background: var(--accent-judge); color: white;">
            📋 My Appointments
          </button>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <div class="px-4 py-3 rounded-lg cursor-pointer transition-all" style="background: rgba(67, 233, 123, 0.15); color: var(--accent-client);">
            <span class="text-sm font-medium">📋 Dashboard</span>
          </div>
          <button @click="logout" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🚪 Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6" style="color: var(--text-1); font-family: 'Syne', sans-serif;">Client Dashboard</h1>
        
        <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Book Appointment Section -->
        <section style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">{{ editMode ? '✏️ Update Appointment' : '📅 Book Appointment' }}</h2>
          
          <form @submit.prevent="bookAppointment" class="space-y-4">
            <div>
              <label for="service" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Court Service</label>
              <select id="service" v-model="booking.service" required class="input-field">
                <option value="">Select a service</option>
                <option value="Case Filing (Civil / Criminal)">🏛️ Case Filing (Civil / Criminal)</option>
                <option value="Document Submission & Certification">📄 Document Submission & Certification</option>
                <option value="Mediation & Dispute Resolution">⚖️ Mediation & Dispute Resolution</option>
                <option value="Hearing Appointment Booking">📅 Hearing Appointment Booking</option>
                <option value="Case Status Inquiry">🔍 Case Status Inquiry</option>
                <option value="Court Order / Certificate Request">📜 Court Order / Certificate Request</option>
                <option value="Legal Aid Application">👤 Legal Aid Application</option>
                <option value="Others">📄 Others</option>
              </select>
            </div>

            <div>
              <label for="date" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Preferred Date</label>
              <input id="date" v-model="booking.date" type="date" required class="input-field" />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Description</label>
              <textarea id="description" v-model="booking.description" rows="3" class="input-field"></textarea>
            </div>

            <div>
              <label for="documents" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Upload Documents</label>
              <input id="documents" @change="handleFileUpload" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="input-field" />
              <p class="text-xs mt-1" style="color: var(--text-3);">PDF, JPG, PNG (Max 5MB each)</p>
            </div>

            <button type="submit" class="w-full px-4 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90" style="background: var(--accent-client); color: white;">
              {{ editMode ? 'Update Appointment' : 'Book Appointment' }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="w-full px-4 py-2 rounded-lg transition-all" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">
              Cancel
            </button>
          </form>
        </section>

        <!-- My Appointments Section -->
        <section style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">📋 My Appointments</h2>
          
          <div v-if="appointments.length === 0" class="text-center py-8" style="color: var(--text-3);">
            No appointments yet
          </div>

          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <article 
              v-for="apt in appointments" 
              :key="apt.id" 
              class="rounded-lg p-4 transition-all hover:opacity-90"
              style="background: var(--bg-hover); border: 1px solid var(--border);"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold" style="color: var(--text-1);">{{ apt.service }}</h3>
                <span 
                  :class="getStatusClass(apt.status)"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ apt.status }}
                </span>
              </div>
              <p class="text-sm mb-2" style="color: var(--text-2);">📅 {{ apt.date }}</p>
              <p v-if="apt.remarks" class="text-sm mt-2" style="color: var(--text-2);">💬 {{ apt.remarks }}</p>
              
              <div v-if="apt.status === 'Pending'" class="flex gap-2 mt-3">
                <button 
                  @click="editAppointment(apt)" 
                  class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                  style="background: var(--accent-judge); color: white;"
                >
                  ✏️ Edit
                </button>
                <button 
                  @click="deleteAppointment(apt.id)" 
                  class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                  style="background: var(--accent-admin); color: white;"
                >
                  🗑️ Delete
                </button>
              </div>
            </article>
          </div>
        </section>

        </div>

      <p v-if="message" :class="messageClass" class="mt-4 p-3 rounded-lg text-center" role="alert">
        {{ message }}
      </p>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'ClientDashboard',
  setup() {
    const router = useRouter()
    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
    const booking = ref({ service: '', date: '', description: '', files: [] })
    const appointments = ref([])
    const message = ref('')
    const messageClass = ref('')
    const editMode = ref(false)
    const editId = ref(null)
    const showBookingForm = ref(false)
    const showMyAppointments = ref(false)

    const handleFileUpload = (e) => {
      booking.value.files = Array.from(e.target.files)
    }

    const bookAppointment = async () => {
      try {
        if (editMode.value) {
          await api.put(`/appointments/${editId.value}`, {
            service: booking.value.service,
            date: booking.value.date,
            description: booking.value.description
          })
          message.value = '✅ Appointment updated successfully!'
          editMode.value = false
          editId.value = null
        } else {
          const formData = new FormData()
          formData.append('service', booking.value.service)
          formData.append('date', booking.value.date)
          formData.append('description', booking.value.description)
          
          booking.value.files.forEach(file => {
            formData.append('documents', file)
          })

          await api.post('/appointments', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          message.value = '✅ Appointment booked successfully!'
        }

        messageClass.value = 'bg-green-100 text-green-800'
        booking.value = { service: '', date: '', description: '', files: [] }
        fetchAppointments()
      } catch (err) {
        message.value = editMode.value ? '❌ Failed to update appointment' : '❌ Failed to book appointment'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/my')
        appointments.value = response.data
      } catch (err) {
        console.error('Failed to fetch appointments', err)
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

    const editAppointment = (apt) => {
      editMode.value = true
      editId.value = apt.id
      booking.value = {
        service: apt.service,
        date: apt.date,
        description: apt.description || '',
        files: []
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const cancelEdit = () => {
      editMode.value = false
      editId.value = null
      booking.value = { service: '', date: '', description: '', files: [] }
    }

    const deleteAppointment = async (id) => {
      if (!confirm('Are you sure you want to delete this appointment?')) return
      
      try {
        await api.delete(`/appointments/${id}`)
        message.value = '✅ Appointment deleted successfully'
        messageClass.value = 'bg-green-100 text-green-800'
        fetchAppointments()
      } catch (err) {
        message.value = '❌ Failed to delete appointment'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    onMounted(() => {
      fetchAppointments()
    })

    return { 
      user,
      booking, 
      appointments, 
      message, 
      messageClass, 
      editMode,
      showBookingForm,
      showMyAppointments,
      handleFileUpload, 
      bookAppointment, 
      editAppointment,
      cancelEdit,
      deleteAppointment,
      getStatusClass, 
      logout 
    }
  }
}
</script>
