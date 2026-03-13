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
<<<<<<< HEAD

        <!-- Profile Card -->
        <div class="mb-6" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                 style="background: linear-gradient(135deg, var(--accent-judge), #c084fc);">
              {{ authStore.user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ authStore.user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ authStore.user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(167, 139, 250, 0.15); color: var(--accent-judge);">
                Judge
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="mb-6 space-y-2">
          <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
            <p class="text-xs" style="color: var(--text-3);">Total Cases</p>
            <p class="text-2xl font-bold" style="color: var(--accent-judge);">
              {{ appointmentStore.appointments.length }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
              <p class="text-xs" style="color: var(--text-3);">In Progress</p>
              <p class="text-xl font-bold text-green-400">{{ inProgressCount }}</p>
            </div>
            <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
              <p class="text-xs" style="color: var(--text-3);">Completed</p>
              <p class="text-xl font-bold" style="color: var(--text-2);">{{ completedCount }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button
            @click="showMyCases = true"
            class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
          >
            <span class="text-sm font-medium">⚖️ My Cases</span>
          </button>
          <button
            @click="showCaseHistory = true"
            class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);"
          >
            <span class="text-sm font-medium">📜 Case History</span>
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
      <div class="mb-6">
        <h1 class="text-3xl font-bold" style="color: var(--text-1); font-family: 'Syne', sans-serif;">
          Judge Dashboard
        </h1>
        <p style="color: var(--text-3);">Welcome back, {{ authStore.user?.name }}</p>
      </div>

=======

        <!-- Profile Card -->
        <div class="mb-6" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 24px;">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4" style="background: linear-gradient(135deg, var(--accent-judge), #c084fc);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-4" style="color: var(--text-3);">{{ user?.email }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase; letter-spacing: 0.5px;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" style="background: rgba(167, 139, 250, 0.15); color: var(--accent-judge);">Judge</span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button @click="showMyCases = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">⚖️ My Cases</span>
          </button>
          <button @click="showSchedule = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">📅 Schedule</span>
          </button>
          <button @click="showCaseHistory = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">📜 Case History</span>
          </button>
          <button @click="logout" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80" style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🚪 Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
      <div class="grid md:grid-cols-3 gap-6">

        <!-- Assigned Cases List -->
        <section class="md:col-span-1 card" aria-label="Assigned Cases">
          <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">⚖️ Assigned Cases</h2>

          <!-- Loading state -->
          <div v-if="appointmentStore.loading" 
               class="text-center py-8" style="color: var(--text-3);">
            Loading cases...
          </div>

          <div v-else-if="appointmentStore.appointments.length === 0"
               class="text-center py-8" style="color: var(--text-3);">
            No cases assigned yet
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="caseItem in appointmentStore.appointments"
              :key="caseItem.id"
              @click="selectCase(caseItem)"
<<<<<<< HEAD
=======
              :class="selectedCase?.id === caseItem.id ? 'bg-judge text-white' : 'bg-white hover:bg-gray-100 border border-gray-200'"
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
              class="w-full text-left p-3 rounded-lg transition-colors"
              :style="selectedCase?.id === caseItem.id
                ? 'background: var(--accent-judge); color: white;'
                : 'background: var(--bg-hover); color: var(--text-1);'"
            >
<<<<<<< HEAD
              <p class="font-semibold text-sm">{{ caseItem.service }}</p>
              <p class="text-xs opacity-80">{{ caseItem.clientName }}</p>
              <p class="text-xs opacity-70">📅 {{ caseItem.date }}</p>
              <span :class="getStatusClass(caseItem.status)"
                    class="inline-block px-2 py-0.5 rounded text-xs mt-1">
                {{ caseItem.status }}
              </span>
=======
              <p class="font-semibold text-gray-900">{{ caseItem.service }}</p>
              <p class="text-sm text-gray-700">{{ caseItem.clientName }}</p>
              <p class="text-xs text-gray-600">📅 {{ caseItem.date }}</p>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
            </button>
          </div>
        </section>

        <!-- Case Details -->
        <section class="md:col-span-2 card" aria-label="Case Details">
          <div v-if="!selectedCase"
               class="text-center py-16" style="color: var(--text-3);">
            Select a case to view details
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">📁 Case Details</h2>

            <div class="space-y-4">
<<<<<<< HEAD
              <!-- Case Info -->
              <div class="p-4 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
                <p style="color: var(--text-1);"><strong>Service:</strong> {{ selectedCase.service }}</p>
                <p style="color: var(--text-1);"><strong>Client:</strong> {{ selectedCase.clientName }}</p>
                <p style="color: var(--text-1);"><strong>Date:</strong> {{ selectedCase.date }}</p>
                <p style="color: var(--text-1);">
                  <strong>Status:</strong>
                  <span :class="getStatusClass(selectedCase.status)"
                        class="px-2 py-1 rounded text-xs font-semibold ml-1">
                    {{ selectedCase.status }}
                  </span>
                </p>
                <p v-if="selectedCase.description" class="mt-2" style="color: var(--text-2);">
                  <strong style="color: var(--text-1);">Description:</strong> {{ selectedCase.description }}
                </p>
=======
              <div class="bg-white p-4 rounded-lg border border-gray-200">
                <p class="text-gray-900"><strong class="text-gray-900">Service:</strong> {{ selectedCase.service }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Client:</strong> {{ selectedCase.clientName }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Date:</strong> {{ selectedCase.date }}</p>
                <p class="text-gray-900"><strong class="text-gray-900">Status:</strong> 
                  <span :class="getStatusClass(selectedCase.status)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ selectedCase.status }}
                  </span>
                </p>
                <p v-if="selectedCase.description" class="mt-2 text-gray-900"><strong class="text-gray-900">Description:</strong> {{ selectedCase.description }}</p>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
              </div>

              <!-- Documents -->
              <div>
                <h3 class="font-semibold mb-2" style="color: var(--text-1);">📄 Uploaded Documents</h3>
                <div v-if="selectedCase.documents?.length" class="space-y-2">
                  <a
                    v-for="(doc, idx) in selectedCase.documents"
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

              <!-- Remarks -->
              <div>
                <label for="remarks" class="block font-semibold mb-2" style="color: var(--text-1);">
                  💬 Add Remarks
                </label>
                <textarea
                  id="remarks"
                  v-model="remarks"
                  rows="3"
                  class="input-field"
                  placeholder="Add your notes or observations..."
                ></textarea>
              </div>

              <!-- Reschedule -->
              <div class="border-t pt-4" style="border-color: var(--border);">
                <h3 class="font-semibold mb-2" style="color: var(--text-1);">📅 Reschedule Hearing</h3>
                <div class="flex gap-2">
                  <label for="reschedule-date" class="sr-only">New hearing date</label>
                  <input
                    id="reschedule-date"
                    v-model="newDate"
                    type="date"
                    class="input-field flex-1"
                  />
                  <button
                    @click="handleReschedule"
                    :disabled="appointmentStore.loading"
                    class="btn-judge"
                  >
                    Reschedule
                  </button>
                </div>
              </div>

              <!-- Save Remarks Button -->
              <button
                @click="handleSaveRemarks"
                :disabled="appointmentStore.loading"
                class="btn-judge w-full"
              >
                {{ appointmentStore.loading ? 'Saving...' : 'Save Remarks' }}
              </button>
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

<<<<<<< HEAD
    <!-- My Cases Modal -->
    <MyCasesModal
      :show="showMyCases"
      :cases="appointmentStore.appointments"
      :get-status-class="getStatusClass"
      @close="showMyCases = false"
      @select="handleCaseSelect"
    />

    <!-- Case History Modal -->
    <div v-if="showCaseHistory"
         @click="showCaseHistory = false"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="rounded-lg p-6 max-w-md w-full mx-4"
           style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📜 Case History</h3>
          <button @click="showCaseHistory = false"
                  class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3">
          <div class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="text-sm" style="color: var(--text-2);">📈 Total Cases Handled</p>
            <p class="text-2xl font-bold" style="color: var(--accent-judge);">
              {{ appointmentStore.appointments.length }}
            </p>
          </div>
          <div class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="text-sm" style="color: var(--text-2);">✅ Completed</p>
            <p class="text-xl font-bold text-green-400">{{ completedCount }}</p>
          </div>
          <div class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="text-sm" style="color: var(--text-2);">🔄 Rescheduled</p>
            <p class="text-xl font-bold text-blue-400">{{ rescheduledCount }}</p>
          </div>
          <div class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="text-sm" style="color: var(--text-2);">⏳ In Progress</p>
            <p class="text-xl font-bold text-yellow-400">{{ inProgressCount }}</p>
=======
    <!-- Modals -->
    <div v-if="showMyCases" @click="showMyCases = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">⚖️ My Cases Summary</h3>
          <button @click="showMyCases = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3">
          <div class="p-4 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="text-2xl font-bold" style="color: var(--accent-judge);">{{ cases.length }}</p>
            <p style="color: var(--text-2);">Total Assigned Cases</p>
          </div>
          <div v-for="caseItem in cases.slice(0, 5)" :key="caseItem.id" class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="font-semibold" style="color: var(--text-1);">{{ caseItem.service }}</p>
            <p class="text-sm" style="color: var(--text-2);">Client: {{ caseItem.clientName }}</p>
            <p class="text-xs" style="color: var(--text-3);">📅 {{ caseItem.date }}</p>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
=======

    <div v-if="showSchedule" @click="showSchedule = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📅 My Schedule</h3>
          <button @click="showSchedule = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3">
          <div v-for="caseItem in cases.filter(c => c.date)" :key="caseItem.id" class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="font-semibold" style="color: var(--text-1);">📅 {{ caseItem.date }}</p>
            <p class="text-sm" style="color: var(--text-2);">{{ caseItem.service }}</p>
            <p class="text-xs" style="color: var(--text-3);">{{ caseItem.clientName }}</p>
          </div>
          <p v-if="cases.length === 0" style="color: var(--text-3);" class="text-center py-4">No scheduled hearings</p>
        </div>
      </div>
    </div>

    <div v-if="showCaseHistory" @click="showCaseHistory = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="bg-white rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">📜 Case History</h3>
          <button @click="showCaseHistory = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3" style="color: var(--text-2);">
          <p>📈 Total Cases Handled: {{ cases.length }}</p>
          <p>✅ Completed: {{ cases.filter(c => c.status === 'Completed').length }}</p>
          <p>🔄 Rescheduled: {{ cases.filter(c => c.status === 'Rescheduled').length }}</p>
          <p>⏳ In Progress: {{ cases.filter(c => c.status === 'Approved').length }}</p>
        </div>
      </div>
    </div>
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAppointmentStore } from '../stores/appointment'
import { useStatusClass } from '../composables/useStatusClass'
import MyCasesModal from '../components/MyCasesModal.vue'

export default {
  name: 'JudgeDashboard',
  components: {
    MyCasesModal
  },
  setup() {
    const router = useRouter()
<<<<<<< HEAD
    const authStore = useAuthStore()
    const appointmentStore = useAppointmentStore()
    const { getStatusClass } = useStatusClass()

    const selectedCase = ref(null)
    const remarks = ref('')
    const newDate = ref('')
    const successMessage = ref('')
=======
    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
    const cases = ref([])
    const selectedCase = ref(null)
    const remarks = ref('')
    const newDate = ref('')
    const message = ref('')
    const messageClass = ref('')
    const showMyCases = ref(false)
    const showSchedule = ref(false)
    const showCaseHistory = ref(false)
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859

    // Modal visibility
    const showMyCases = ref(false)
    const showCaseHistory = ref(false)

    // Computed stats from store
    const inProgressCount = computed(() =>
      appointmentStore.appointments.filter(c => c.status === 'Approved').length
    )
    const completedCount = computed(() =>
      appointmentStore.appointments.filter(c => c.status === 'Completed').length
    )
    const rescheduledCount = computed(() =>
      appointmentStore.appointments.filter(c => c.status === 'Rescheduled').length
    )

    const selectCase = (caseItem) => {
      selectedCase.value = caseItem
      remarks.value = caseItem.remarks || ''
      newDate.value = ''
    }

    // Called when a case is selected from MyCasesModal
    const handleCaseSelect = (caseItem) => {
      selectCase(caseItem)
      showMyCases.value = false
    }

    const handleSaveRemarks = async () => {
      if (!selectedCase.value) return
      try {
        const { default: api } = await import('../utils/api')
        await api.patch(`/appointments/${selectedCase.value.id}/remarks`, {
          remarks: remarks.value
        })
        await appointmentStore.fetchAssignedCases()
        successMessage.value = 'Remarks saved successfully'
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch (err) {
        console.error('Failed to save remarks', err)
      }
    }

<<<<<<< HEAD
    const handleReschedule = async () => {
      if (!newDate.value || !selectedCase.value) return
      try {
        await appointmentStore.reschedule(
          selectedCase.value.id,
          newDate.value,
          remarks.value
        )
        await appointmentStore.fetchAssignedCases()
        successMessage.value = 'Hearing rescheduled successfully'
        newDate.value = ''
        setTimeout(() => { successMessage.value = '' }, 3000)
      } catch {
        // error shown from store
      }
=======
    const getStatusClass = (status) => {
      const classes = {
        'Pending': 'bg-yellow-200 text-yellow-900',
        'Approved': 'bg-green-200 text-green-900',
        'Rejected': 'bg-red-200 text-red-900',
        'Rescheduled': 'bg-blue-200 text-blue-900',
        'Completed': 'bg-gray-300 text-gray-900'
      }
      return classes[status] || 'bg-gray-300 text-gray-900'
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
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
      appointmentStore.fetchAssignedCases()
    })

<<<<<<< HEAD
    return {
      authStore,
      appointmentStore,
      selectedCase,
      remarks,
      newDate,
      successMessage,
      showMyCases,
      showCaseHistory,
      inProgressCount,
      completedCount,
      rescheduledCount,
      getStatusClass,
      selectCase,
      handleCaseSelect,
      handleSaveRemarks,
      handleReschedule,
      logout
=======
    return { 
      user, 
      cases, 
      selectedCase, 
      remarks, 
      newDate, 
      message, 
      messageClass,
      showMyCases,
      showSchedule,
      showCaseHistory,
      selectCase, 
      saveRemarks, 
      reschedule, 
      getStatusClass, 
      logout 
>>>>>>> 2fe3ffefc7bcfb46e20d5e47f90038c4931fe859
    }
  }
}
</script>