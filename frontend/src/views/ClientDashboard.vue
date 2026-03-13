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
              {{ authStore.user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ authStore.user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ authStore.user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(67, 233, 123, 0.15); color: var(--accent-client);">Client</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 mb-6">
          <button 
            @click="showBookingModal = true" 
            class="w-full px-4 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
            style="background: var(--accent-client); color: white;"
          >
            📅 Book Appointment
          </button>
          <button 
            @click="showAppointmentsModal = true" 
            class="w-full px-4 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
            style="background: var(--accent-judge); color: white;"
          >
            📋 My Appointments
          </button>
        </div>

        <!-- Logout -->
        <button 
          @click="logout" 
          class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
          style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
        >
          <span class="text-sm font-medium">🚪 Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-2" 
            style="color: var(--text-1); font-family: 'Syne', sans-serif;">
          Client Dashboard
        </h1>
        <p class="mb-6" style="color: var(--text-3);">
          Welcome back, {{ authStore.user?.name }}
        </p>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="card text-center">
            <p class="text-2xl font-bold" style="color: var(--accent-client);">
              {{ appointmentStore.appointments.length }}
            </p>
            <p class="text-sm" style="color: var(--text-2);">Total</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-yellow-400">
              {{ pendingCount }}
            </p>
            <p class="text-sm" style="color: var(--text-2);">Pending</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-green-400">
              {{ approvedCount }}
            </p>
            <p class="text-sm" style="color: var(--text-2);">Approved</p>
          </div>
        </div>

        <!-- Book Appointment Form -->
        <section class="card">
          <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">
            {{ editMode ? '✏️ Update Appointment' : '📅 Book New Appointment' }}
          </h2>

          <form @submit.prevent="submitBooking" class="space-y-4">
            <div>
              <label for="service" class="block text-sm font-medium mb-1" 
                     style="color: var(--text-2);">Court Service</label>
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
              <label for="date" class="block text-sm font-medium mb-1" 
                     style="color: var(--text-2);">Preferred Date</label>
              <input id="date" v-model="booking.date" type="date" 
                     required class="input-field" />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium mb-1" 
                     style="color: var(--text-2);">Description</label>
              <textarea id="description" v-model="booking.description" 
                        rows="3" class="input-field"></textarea>
            </div>

            <div v-if="!editMode">
              <label for="documents" class="block text-sm font-medium mb-1" 
                     style="color: var(--text-2);">Upload Documents</label>
              <input id="documents" @change="handleFileUpload" type="file" 
                     multiple accept=".pdf,.jpg,.jpeg,.png" class="input-field" />
              <p class="text-xs mt-1" style="color: var(--text-3);">
                PDF, JPG, PNG (Max 5MB each)
              </p>
            </div>

            <div class="flex gap-3">
              <button 
                type="submit" 
                :disabled="appointmentStore.loading"
                class="flex-1 px-4 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style="background: var(--accent-client); color: white;"
              >
                {{ appointmentStore.loading ? 'Saving...' : (editMode ? 'Update Appointment' : 'Book Appointment') }}
              </button>
              <button 
                v-if="editMode" 
                @click="cancelEdit" 
                type="button"
                class="flex-1 px-4 py-2 rounded-lg transition-all"
                style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);"
              >
                Cancel
              </button>
            </div>
          </form>

          <!-- Error from store -->
          <p v-if="appointmentStore.error" 
             class="mt-3 p-3 rounded-lg text-sm bg-red-100 text-red-800" 
             role="alert">
            ❌ {{ appointmentStore.error }}
          </p>

          <!-- Success message -->
          <p v-if="successMessage" 
             class="mt-3 p-3 rounded-lg text-sm bg-green-100 text-green-800" 
             role="alert">
            ✅ {{ successMessage }}
          </p>
        </section>
      </div>
    </main>

    <!-- Modals -->
    <BookAppointmentModal
      :show="showBookingModal"
      :formData="booking"
      @close="showBookingModal = false"
      @submit="submitBooking"
      @file-upload="handleFileUpload"
    />

    <MyAppointmentsModal
      :show="showAppointmentsModal"
      :appointments="appointmentStore.appointments"
      :get-status-class="getStatusClass"
      @close="showAppointmentsModal = false"
      @edit="startEdit"
      @delete="deleteAppointment"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAppointmentStore } from '../stores/appointment'
import { useStatusClass } from '../composables/useStatusClass'
import BookAppointmentModal from '../components/BookAppointmentModal.vue'
import MyAppointmentsModal from '../components/MyAppointmentsModal.vue'

export default {
  name: 'ClientDashboard',
  components: {
    BookAppointmentModal,
    MyAppointmentsModal
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const appointmentStore = useAppointmentStore()
    const { getStatusClass } = useStatusClass()

    const booking = ref({ service: '', date: '', description: '', files: [] })
    const editMode = ref(false)
    const editId = ref(null)
    const successMessage = ref('')
    const showBookingModal = ref(false)
    const showAppointmentsModal = ref(false)

    // Computed stats from the store
    const pendingCount = computed(() =>
      appointmentStore.appointments.filter(a => a.status === 'Pending').length
    )
    const approvedCount = computed(() =>
      appointmentStore.appointments.filter(a => a.status === 'Approved').length
    )

    const handleFileUpload = (e) => {
      booking.value.files = Array.from(e.target.files)
    }

    const submitBooking = async () => {
      successMessage.value = ''
      try {
        if (editMode.value) {
          // Update uses api directly since store doesn't have updateAppointment yet
          const { default: api } = await import('../utils/api')
          await api.put(`/appointments/${editId.value}`, {
            service: booking.value.service,
            date: booking.value.date,
            description: booking.value.description
          })
          await appointmentStore.fetchMyAppointments()
          successMessage.value = 'Appointment updated successfully!'
          editMode.value = false
          editId.value = null
        } else {
          const formData = new FormData()
          formData.append('service', booking.value.service)
          formData.append('date', booking.value.date)
          formData.append('description', booking.value.description)
          booking.value.files.forEach(file => formData.append('documents', file))
          await appointmentStore.bookAppointment(formData)
          successMessage.value = 'Appointment booked successfully!'
          showBookingModal.value = false
        }
        booking.value = { service: '', date: '', description: '', files: [] }
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch {
        // error already set in store
      }
    }

    const startEdit = (apt) => {
      editMode.value = true
      editId.value = apt.id
      booking.value = {
        service: apt.service,
        date: apt.date,
        description: apt.description || '',
        files: []
      }
      showAppointmentsModal.value = false
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
        const { default: api } = await import('../utils/api')
        await api.delete(`/appointments/${id}`)
        await appointmentStore.fetchMyAppointments()
        successMessage.value = 'Appointment deleted successfully'
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch {
        // silently handle
      }
    }

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    onMounted(() => {
      appointmentStore.fetchMyAppointments()
    })

    return {
      authStore,
      appointmentStore,
      booking,
      editMode,
      successMessage,
      showBookingModal,
      showAppointmentsModal,
      pendingCount,
      approvedCount,
      getStatusClass,
      handleFileUpload,
      submitBooking,
      startEdit,
      cancelEdit,
      deleteAppointment,
      logout
    }
  }
}
</script>