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
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                 style="background: linear-gradient(135deg, var(--accent-client), #2dd4bf);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-2" style="color: var(--text-3);">{{ user?.email }}</p>
            <p v-if="user?.phone" class="text-sm mb-2" style="color: var(--text-3);">📞 {{ user?.phone }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(67, 233, 123, 0.15); color: var(--accent-client);">Client</span>
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
          <button @click="logout" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🚪 Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-2" style="color: var(--text-1); font-family: 'Syne', sans-serif;">
          Client Dashboard
        </h1>
        <p class="mb-6" style="color: var(--text-3);">Welcome back, {{ user?.name }}</p>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="card text-center">
            <p class="text-2xl font-bold" style="color: var(--accent-client);">{{ appointments.length }}</p>
            <p class="text-sm" style="color: var(--text-2);">Total</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-yellow-400">{{ appointments.filter(a => a.status === 'Pending').length }}</p>
            <p class="text-sm" style="color: var(--text-2);">Pending</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-green-400">{{ appointments.filter(a => a.status === 'Approved').length }}</p>
            <p class="text-sm" style="color: var(--text-2);">Approved</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">

          <!-- Book Appointment Section -->
          <section style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
            <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">
              {{ editMode ? '✏️ Update Appointment' : '📅 Book Appointment' }}
            </h2>

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
                <input id="date" v-model="booking.date" type="date" required class="input-field" :min="today" />
              </div>

              <div>
                <label for="description" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Description</label>
                <textarea id="description" v-model="booking.description" rows="3" class="input-field"></textarea>
              </div>

              <div v-if="!editMode">
                <label for="documents" class="block text-sm font-medium mb-1" style="color: var(--text-2);">Upload Documents</label>
                <input id="documents" @change="handleFileUpload" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="input-field" />
                <p class="text-xs mt-1" style="color: var(--text-3);">PDF, JPG, PNG (Max 5MB each)</p>
              </div>

              <div class="flex gap-3">
                <button type="submit" class="flex-1 px-4 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style="background: var(--accent-client); color: white;">
                  {{ editMode ? 'Update Appointment' : 'Book Appointment' }}
                </button>
                <button v-if="editMode" @click="cancelEdit" type="button"
                  class="flex-1 px-4 py-2 rounded-lg transition-all"
                  style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">
                  Cancel
                </button>
              </div>
            </form>

            <p v-if="message" :class="messageClass" class="mt-3 p-3 rounded-lg text-sm" role="alert">
              {{ message }}
            </p>
          </section>

          <!-- My Appointments Section -->
          <section style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold" style="color: var(--text-1);">📋 My Appointments</h2>
              <span class="px-2 py-1 rounded-full text-xs font-semibold" style="background: var(--bg-hover); color: var(--text-2);">{{ appointments.length }}</span>
            </div>

            <input v-model="aptSearch" type="text" placeholder="🔍 Search appointments..." class="input-field mb-4 text-sm" />

            <div v-if="filteredApts.length === 0" class="text-center py-8" style="color: var(--text-3);">
              {{ appointments.length === 0 ? 'No appointments yet' : 'No results found' }}
            </div>

            <div v-else class="space-y-3 max-h-96 overflow-y-auto">
              <article
                v-for="apt in filteredApts"
                :key="apt.id"
                class="rounded-lg p-4 transition-all"
                style="background: var(--bg-hover); border: 1px solid var(--border);"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold" style="color: var(--text-1);">{{ apt.service }}</h3>
                  <span :class="getStatusClass(apt.status)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ apt.status }}
                  </span>
                </div>
                <p class="text-sm mb-2" style="color: var(--text-2);">📅 {{ apt.date }}</p>
                <p v-if="apt.remarks" class="text-sm mt-2" style="color: var(--text-2);">💬 {{ apt.remarks }}</p>

                <div v-if="apt.status === 'Pending'" class="flex gap-2 mt-3">
                  <button @click="editAppointment(apt)"
                    class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                    style="background: var(--accent-judge); color: white;">
                    ✏️ Edit
                  </button>
                  <button @click="deleteAppointment(apt.id)"
                    class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                    style="background: var(--accent-admin); color: white;">
                    ❌ Cancel
                  </button>
                </div>
              </article>
            </div>
          </section>

        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-10 pt-4 text-center text-xs" style="color: var(--text-3); border-top: 1px solid var(--border);">
        © {{ new Date().getFullYear() }} Court Management System. All rights reserved.
      </footer>
    </main>
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
          <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-medium" style="background: var(--accent-client);">Save Changes</button>
          <button type="button" @click="showEditProfile = false" class="flex-1 px-4 py-2 rounded-lg font-medium" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'ClientDashboard',
  setup() {
    const router = useRouter()
    const user = ref(JSON.parse(sessionStorage.getItem('user') || '{}'))
    const booking = ref({ service: '', date: '', description: '', files: [] })
    const appointments = ref([])
    const message = ref('')
    const messageClass = ref('')
    const editMode = ref(false)
    const editId = ref(null)
    const aptSearch = ref('')
    const showEditProfile = ref(false)
    const profileMessage = ref('')
    const profileSuccess = ref(false)
    const profileForm = ref({ email: '', phone: '', password: '' })

    const today = new Date().toISOString().split('T')[0]

    const filteredApts = computed(() => {
      const q = aptSearch.value.toLowerCase()
      if (!q) return appointments.value
      return appointments.value.filter(a =>
        a.service.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
      )
    })

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

    const handleFileUpload = (e) => {
      booking.value.files = Array.from(e.target.files)
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/my')
        appointments.value = response.data
      } catch (err) {
        console.error('Failed to fetch appointments', err)
      }
    }

    const bookAppointment = async () => {
      message.value = ''
      try {
        if (editMode.value) {
          await api.put(`/appointments/${editId.value}`, {
            service: booking.value.service,
            date: booking.value.date,
            description: booking.value.description
          })
          message.value = '✅ Appointment updated successfully!'
          messageClass.value = 'bg-green-100 text-green-800'
          editMode.value = false
          editId.value = null
        } else {
          const formData = new FormData()
          formData.append('service', booking.value.service)
          formData.append('date', booking.value.date)
          formData.append('description', booking.value.description)
          booking.value.files.forEach(file => formData.append('documents', file))

          await api.post('/appointments', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          message.value = '✅ Appointment booked successfully!'
          messageClass.value = 'bg-green-100 text-green-800'
        }

        booking.value = { service: '', date: '', description: '', files: [] }
        fetchAppointments()
      } catch (err) {
        message.value = editMode.value ? '❌ Failed to update appointment' : '❌ Failed to book appointment'
        messageClass.value = 'bg-red-100 text-red-800'
      }
    }

    const editAppointment = (apt) => {
      editMode.value = true
      editId.value = apt.id
      booking.value = { service: apt.service, date: apt.date, description: apt.description || '', files: [] }
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
    })

    return {
      today,
      user,
      booking,
      appointments,
      message,
      messageClass,
      editMode,
      aptSearch,
      filteredApts,
      showEditProfile,
      profileForm,
      profileMessage,
      profileSuccess,
      openEditProfile,
      saveProfile,
      handleFileUpload,
      bookAppointment,
      editAppointment,
      cancelEdit,
      deleteAppointment,
      getStatusClass,
      logout,
      goHome
    }
  }
}
</script>
