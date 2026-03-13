<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">📋 My Appointments</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div v-if="appointments.length === 0" class="text-center py-8" style="color: var(--text-3);">
        No appointments yet
      </div>

      <div v-else class="space-y-3 max-h-96 overflow-y-auto">
        <article 
          v-for="apt in appointments" 
          :key="apt.id" 
          class="rounded-lg p-4"
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
              @click="$emit('edit', apt)" 
              class="flex-1 px-3 py-2 rounded-lg text-sm font-medium"
              style="background: var(--accent-judge); color: white;"
            >
              ✏️ Edit
            </button>
            <button 
              @click="$emit('delete', apt.id)" 
              class="flex-1 px-3 py-2 rounded-lg text-sm font-medium"
              style="background: var(--accent-admin); color: white;"
            >
              ❌ Cancel
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAppointmentsModal',
  props: {
    show: Boolean,
    appointments: Array,
    getStatusClass: Function
  },
  emits: ['close', 'edit', 'delete']
}
</script>