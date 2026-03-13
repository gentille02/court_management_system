<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">⚖️ My Cases</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div v-if="cases.length === 0" class="text-center py-8" style="color: var(--text-3);">
        No cases assigned
      </div>

      <div v-else class="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        <div 
          v-for="caseItem in cases" 
          :key="caseItem.id" 
          class="rounded-lg p-4 cursor-pointer hover:opacity-90"
          style="background: var(--bg-hover); border: 1px solid var(--border);"
          @click="$emit('select', caseItem)"
        >
          <h3 class="font-semibold mb-2" style="color: var(--text-1);">{{ caseItem.service }}</h3>
          <p class="text-sm mb-1" style="color: var(--text-2);">Client: {{ caseItem.clientName }}</p>
          <p class="text-sm mb-2" style="color: var(--text-2);">📅 {{ caseItem.date }}</p>
          <span 
            :class="getStatusClass(caseItem.status)"
            class="px-2 py-1 rounded text-xs font-medium"
          >
            {{ caseItem.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCasesModal',
  props: {
    show: Boolean,
    cases: Array,
    getStatusClass: Function
  },
  emits: ['close', 'select']
}
</script>