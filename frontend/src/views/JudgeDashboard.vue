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
                 style="background: linear-gradient(135deg, var(--accent-judge), #c084fc);">
              {{ user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color: var(--text-1);">{{ user?.name }}</h2>
            <p class="text-sm mb-2" style="color: var(--text-3);">{{ user?.email }}</p>
            <p v-if="user?.phone" class="text-sm mb-2" style="color: var(--text-3);">📞 {{ user?.phone }}</p>
            <div class="w-full pt-4" style="border-top: 1px solid var(--border);">
              <p class="text-xs font-semibold mb-2" style="color: var(--text-2); text-transform: uppercase;">Role</p>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style="background: rgba(167, 139, 250, 0.15); color: var(--accent-judge);">
                Judge
              </span>
            </div>
            <button @click="openEditProfile" class="mt-4 w-full px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">✏️ Edit Profile</button>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="mb-6 space-y-2">
          <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
            <p class="text-xs" style="color: var(--text-3);">Total Cases</p>
            <p class="text-2xl font-bold" style="color: var(--accent-judge);">{{ cases.length }}</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
              <p class="text-xs" style="color: var(--text-3);">In Progress</p>
              <p class="text-xl font-bold text-green-400">{{ cases.filter(c => c.status === 'Approved').length }}</p>
            </div>
            <div class="p-3 rounded-lg" style="background: var(--bg-card); border: 1px solid var(--border);">
              <p class="text-xs" style="color: var(--text-3);">Completed</p>
              <p class="text-xl font-bold" style="color: var(--text-2);">{{ cases.filter(c => c.status === 'Completed').length }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="space-y-2">
          <button @click="goHome" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80 flex items-center"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">🏠 Home</span>
          </button>
          <button @click="showMyCases = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">⚖️ My Cases</span>
          </button>
          <button @click="showCaseHistory = true" class="w-full px-4 py-3 rounded-lg text-left transition-all hover:opacity-80"
            style="background: var(--bg-card); color: var(--text-2); border: 1px solid var(--border);">
            <span class="text-sm font-medium">📜 Case History</span>
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
      <div class="grid md:grid-cols-3 gap-6">

        <!-- Assigned Cases List -->
        <section class="md:col-span-1 card" aria-label="Assigned Cases">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold" style="color: var(--text-1);">⚖️ Assigned Cases</h2>
            <span class="px-2 py-1 rounded-full text-xs font-semibold" style="background: var(--bg-hover); color: var(--text-2);">{{ cases.length }}</span>
          </div>

          <input v-model="caseSearch" type="text" placeholder="🔍 Search by client or service..." class="input-field mb-4 text-sm" />

          <div v-if="filteredCases.length === 0" class="text-center py-8" style="color: var(--text-3);">
            {{ cases.length === 0 ? 'No cases assigned yet' : 'No results found' }}
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="caseItem in filteredCases"
              :key="caseItem.id"
              @click="selectCase(caseItem)"
              class="w-full text-left p-3 rounded-lg transition-colors"
              :style="selectedCase?.id === caseItem.id
                ? 'background: var(--accent-judge); color: white;'
                : 'background: var(--bg-hover); color: var(--text-1);'"
            >
              <p class="font-semibold text-sm">{{ caseItem.service }}</p>
              <p class="text-xs opacity-80">{{ caseItem.client_name }}</p>
              <p class="text-xs opacity-70">📅 {{ caseItem.date }}</p>
              <span :class="getStatusClass(caseItem.status)" class="inline-block px-2 py-0.5 rounded text-xs mt-1 font-semibold">
                {{ caseItem.status }}
              </span>
            </button>
          </div>
        </section>

        <!-- Case Details -->
        <section class="md:col-span-2 card" aria-label="Case Details">
          <div v-if="!selectedCase" class="text-center py-16" style="color: var(--text-3);">
            Select a case to view details
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4" style="color: var(--text-1);">📁 Case Details</h2>

            <div class="space-y-4">
              <!-- Case Info -->
              <div class="p-4 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
                <p style="color: var(--text-1);"><strong>Service:</strong> {{ selectedCase.service }}</p>
                <p style="color: var(--text-1);"><strong>Client:</strong> {{ selectedCase.client_name }}</p>
                <p style="color: var(--text-1);"><strong>Date:</strong> {{ selectedCase.date }}</p>
                <p style="color: var(--text-1);">
                  <strong>Status:</strong>
                  <span :class="getStatusClass(selectedCase.status)" class="px-2 py-1 rounded text-xs font-semibold ml-1">
                    {{ selectedCase.status }}
                  </span>
                </p>
                <p v-if="selectedCase.description" class="mt-2" style="color: var(--text-2);">
                  <strong style="color: var(--text-1);">Description:</strong> {{ selectedCase.description }}
                </p>
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
                <label for="remarks" class="block font-semibold mb-2" style="color: var(--text-1);">💬 Add Remarks</label>
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
                  <input id="reschedule-date" v-model="newDate" type="date" class="input-field flex-1" />
                  <button @click="reschedule" class="btn-judge">Reschedule</button>
                </div>
              </div>

              <button @click="saveRemarks" class="btn-judge w-full">Save Remarks</button>
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

    <!-- My Cases Modal -->
    <div v-if="showMyCases" @click="showMyCases = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="rounded-lg p-6 max-w-2xl w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold" style="color: var(--text-1);">⚖️ My Cases Summary</h3>
          <button @click="showMyCases = false" class="text-2xl" style="color: var(--text-2);">&times;</button>
        </div>
        <div class="space-y-3">
          <div v-for="caseItem in cases" :key="caseItem.id" class="p-3 rounded-lg" style="background: var(--bg-hover); border: 1px solid var(--border);">
            <p class="font-semibold" style="color: var(--text-1);">{{ caseItem.service }}</p>
            <p class="text-sm" style="color: var(--text-2);">Client: {{ caseItem.client_name }}</p>
            <p class="text-xs" style="color: var(--text-3);">📅 {{ caseItem.date }}</p>
          </div>
          <p v-if="cases.length === 0" style="color: var(--text-3);" class="text-center py-4">No cases assigned</p>
        </div>
      </div>
    </div>

    <!-- Case History Modal -->
    <div v-if="showCaseHistory" @click="showCaseHistory = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div @click.stop class="rounded-lg p-6 max-w-md w-full mx-4" style="background: var(--bg-card); border: 1px solid var(--border);">
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
            <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-medium" style="background: var(--accent-judge);">Save Changes</button>
            <button type="button" @click="showEditProfile = false" class="flex-1 px-4 py-2 rounded-lg font-medium" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'JudgeDashboard',
  setup() {
    const router = useRouter()
    const user = ref(JSON.parse(sessionStorage.getItem('user') || '{}'))
    const cases = ref([])
    const selectedCase = ref(null)
    const remarks = ref('')
    const newDate = ref('')
    const message = ref('')
    const messageClass = ref('')
    const showMyCases = ref(false)
    const showCaseHistory = ref(false)
    const caseSearch = ref('')
    const showEditProfile = ref(false)
    const profileMessage = ref('')
    const profileSuccess = ref(false)
    const profileForm = ref({ email: '', phone: '', password: '' })

    const filteredCases = computed(() => {
      const q = caseSearch.value.toLowerCase()
      if (!q) return cases.value
      return cases.value.filter(c =>
        c.client_name?.toLowerCase().includes(q) ||
        c.service?.toLowerCase().includes(q)
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

    const fetchCases = async () => {
      try {
        const response = await api.get('/appointments/assigned')
        cases.value = response.data
      } catch (err) {
        console.error('Failed to fetch cases', err)
      }
    }

    const selectCase = (caseItem) => {
      selectedCase.value = caseItem
      remarks.value = caseItem.remarks || ''
      newDate.value = ''
    }

    const saveRemarks = async () => {
      try {
        await api.patch(`/appointments/${selectedCase.value.id}/remarks`, { remarks: remarks.value })
        message.value = '✅ Remarks saved successfully'
        messageClass.value = 'bg-green-100 text-green-800'
        fetchCases()
      } catch (err) {
        message.value = '❌ Failed to save remarks'
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
        await api.patch(`/appointments/${selectedCase.value.id}/reschedule`, {
          date: newDate.value,
          remarks: remarks.value
        })
        message.value = '✅ Hearing rescheduled successfully'
        messageClass.value = 'bg-green-100 text-green-800'
        newDate.value = ''
        fetchCases()
      } catch (err) {
        message.value = '❌ Failed to reschedule'
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
      fetchCases()
    })

    return {
      user,
      cases,
      selectedCase,
      remarks,
      newDate,
      message,
      messageClass,
      showMyCases,
      showCaseHistory,
      caseSearch,
      filteredCases,
      showEditProfile,
      profileForm,
      profileMessage,
      profileSuccess,
      openEditProfile,
      saveProfile,
      selectCase,
      saveRemarks,
      reschedule,
      getStatusClass,
      logout,
      goHome
    }
  }
}
</script>
