<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-judge text-white p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Judge Dashboard</h1>
        <button @click="logout" class="px-4 py-2 bg-white text-judge rounded-lg hover:bg-gray-100">Logout</button>
      </div>
    </nav>

    <main class="container mx-auto p-6">
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
              :class="selectedCase?.id === caseItem.id ? 'bg-judge text-white' : 'bg-gray-100 hover:bg-gray-200'"
              class="w-full text-left p-3 rounded-lg transition-colors"
            >
              <p class="font-semibold">{{ caseItem.service }}</p>
              <p class="text-sm opacity-80">{{ caseItem.clientName }}</p>
              <p class="text-xs opacity-70">📅 {{ caseItem.date }}</p>
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
              <div class="bg-gray-50 p-4 rounded-lg">
                <p><strong>Service:</strong> {{ selectedCase.service }}</p>
                <p><strong>Client:</strong> {{ selectedCase.clientName }}</p>
                <p><strong>Date:</strong> {{ selectedCase.date }}</p>
                <p><strong>Status:</strong> 
                  <span :class="getStatusClass(selectedCase.status)" class="px-2 py-1 rounded text-xs">
                    {{ selectedCase.status }}
                  </span>
                </p>
                <p v-if="selectedCase.description" class="mt-2"><strong>Description:</strong> {{ selectedCase.description }}</p>
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
    const cases = ref([])
    const selectedCase = ref(null)
    const remarks = ref('')
    const newDate = ref('')
    const message = ref('')
    const messageClass = ref('')

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
      fetchCases()
    })

    return { cases, selectedCase, remarks, newDate, message, messageClass, selectCase, saveRemarks, reschedule, getStatusClass, logout }
  }
}
</script>
