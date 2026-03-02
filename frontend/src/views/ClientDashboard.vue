<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-client text-white p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Client Dashboard</h1>
        <button @click="logout" class="px-4 py-2 bg-white text-client rounded-lg hover:bg-gray-100">Logout</button>
      </div>
    </nav>

    <main class="container mx-auto p-6">
      <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Book Appointment Section -->
        <section class="card">
          <h2 class="text-xl font-bold mb-4">📅 Book Appointment</h2>
          
          <form @submit.prevent="bookAppointment" class="space-y-4">
            <div>
              <label for="service" class="block text-sm font-medium mb-1">Court Service</label>
              <select id="service" v-model="booking.service" required class="input-field focus:ring-client">
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
              <label for="date" class="block text-sm font-medium mb-1">Preferred Date</label>
              <input id="date" v-model="booking.date" type="date" required class="input-field focus:ring-client" />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium mb-1">Description</label>
              <textarea id="description" v-model="booking.description" rows="3" class="input-field focus:ring-client"></textarea>
            </div>

            <div>
              <label for="documents" class="block text-sm font-medium mb-1">Upload Documents</label>
              <input id="documents" @change="handleFileUpload" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="input-field focus:ring-client" />
              <p class="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB each)</p>
            </div>

            <button type="submit" class="btn-client w-full">Book Appointment</button>
          </form>
        </section>

        <!-- My Appointments Section -->
        <section class="card">
          <h2 class="text-xl font-bold mb-4">📋 My Appointments</h2>
          
          <div v-if="appointments.length === 0" class="text-gray-500 text-center py-8">
            No appointments yet
          </div>

          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <article 
              v-for="apt in appointments" 
              :key="apt.id" 
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold">{{ apt.service }}</h3>
                <span 
                  :class="getStatusClass(apt.status)"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ apt.status }}
                </span>
              </div>
              <p class="text-sm text-gray-600">📅 {{ apt.date }}</p>
              <p v-if="apt.remarks" class="text-sm text-gray-700 mt-2">💬 {{ apt.remarks }}</p>
            </article>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'ClientDashboard',
  setup() {
    const router = useRouter()
    const booking = ref({ service: '', date: '', description: '', files: [] })
    const appointments = ref([])
    const message = ref('')
    const messageClass = ref('')

    const handleFileUpload = (e) => {
      booking.value.files = Array.from(e.target.files)
    }

    const bookAppointment = async () => {
      try {
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
        messageClass.value = 'bg-green-100 text-green-800'
        booking.value = { service: '', date: '', description: '', files: [] }
        fetchAppointments()
      } catch (err) {
        message.value = '❌ Failed to book appointment'
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

    onMounted(() => {
      fetchAppointments()
    })

    return { booking, appointments, message, messageClass, handleFileUpload, bookAppointment, getStatusClass, logout }
  }
}
</script>
