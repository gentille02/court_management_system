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
      <div class="grid md:grid-cols-3 gap-6">
        
        <!-- Assigned Cases List -->
        <section class="md:col-span-1 card">
          <h2 class="text-xl font-bold mb-4">⚖️ Assigned Cases</h2>
          
          <div v-if="cases.length === 0" class="text-gray-500 text-center py-8">
            No cases assigned
          </div>

          <div v-else class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="caseItem in cases"
              :key="caseItem.id"
              @click="selectCase(caseItem)"
              :class="selectedCase?.id === caseItem.id ? 'bg-judge text-white' : 'bg-white hover:bg-gray-100 border border-gray-200'"
              class="w-full text-left p-3 rounded-lg transition-colors"
            >
              <p class="font-semibold text-gray-900">{{ caseItem.service }}</p>
              <p class="text-sm text-gray-700">{{ caseItem.clientName }}</p>
              <p class="text-xs text-gray-600">📅 {{ caseItem.date }}</p>
            </button>
          </div>
        </section>

        <!-- Case Details & Documents -->
        <section class="md:col-span-2 card">
          <div v-if="!selectedCase" class="text-gray-500 text-center py-16">
            Select a case to view details
          </div>

          <div v-else>
            <h2 class="text-xl font-bold mb-4">📁 Case Details</h2>
            
            <div class="space-y-4">
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
              </div>

              <!-- Documents -->
              <div>
                <h3 class="font-semibold mb-2">📄 Uploaded Documents</h3>
                <div v-if="selectedCase.documents?.length" class="space-y-2">
                  <a
                    v-for="(doc, idx) in selectedCase.documents"
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

              <!-- Remarks -->
              <div>
                <label for="remarks" class="block font-semibold mb-2">💬 Add Remarks</label>
                <textarea
                  id="remarks"
                  v-model="remarks"
                  rows="3"
                  class="input-field focus:ring-judge"
                  placeholder="Add your notes or observations..."
                ></textarea>
              </div>

              <!-- Reschedule -->
              <div class="border-t pt-4">
                <h3 class="font-semibold mb-2">📅 Reschedule Appointment</h3>
                <div class="flex gap-2">
                  <input
                    v-model="newDate"
                    type="date"
                    class="input-field focus:ring-judge flex-1"
                  />
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
    </main>

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
          </div>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

export default {
  name: 'JudgeDashboard',
  setup() {
    const router = useRouter()
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
        message.value = '✅ Appointment rescheduled successfully'
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
      localStorage.clear()
      router.push('/login')
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
      showSchedule,
      showCaseHistory,
      selectCase, 
      saveRemarks, 
      reschedule, 
      getStatusClass, 
      logout 
    }
  }
}
</script>
