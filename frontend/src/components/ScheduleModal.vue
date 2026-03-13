<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-3xl mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">📅 Schedule</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div class="space-y-4">
        <div class="grid grid-cols-7 gap-2 text-center">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" 
               class="font-semibold py-2" style="color: var(--text-2);">
            {{ day }}
          </div>
        </div>
        
        <div class="grid grid-cols-7 gap-2">
          <div v-for="date in calendarDates" :key="date.date" 
               class="aspect-square p-2 rounded-lg text-sm cursor-pointer hover:opacity-80"
               :class="date.hasAppointment ? 'bg-blue-100 text-blue-800' : 'bg-gray-50'"
               style="border: 1px solid var(--border);">
            <div class="font-semibold">{{ date.day }}</div>
            <div v-if="date.hasAppointment" class="text-xs mt-1">
              {{ date.appointmentCount }} case(s)
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="font-semibold mb-3" style="color: var(--text-1);">Upcoming Cases</h3>
          <div v-if="upcomingCases.length === 0" class="text-center py-4" style="color: var(--text-3);">
            No upcoming cases
          </div>
          <div v-else class="space-y-2 max-h-48 overflow-y-auto">
            <div v-for="caseItem in upcomingCases" :key="caseItem.id" 
                 class="flex justify-between items-center p-3 rounded-lg"
                 style="background: var(--bg-hover); border: 1px solid var(--border);">
              <div>
                <p class="font-medium" style="color: var(--text-1);">{{ caseItem.service }}</p>
                <p class="text-sm" style="color: var(--text-2);">{{ caseItem.clientName }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium" style="color: var(--text-1);">{{ caseItem.date }}</p>
                <span :class="getStatusClass(caseItem.status)" class="px-2 py-1 rounded text-xs">
                  {{ caseItem.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleModal',
  props: {
    show: Boolean,
    cases: Array,
    getStatusClass: Function
  },
  computed: {
    calendarDates() {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      
      const dates = []
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day)
        const dateStr = date.toISOString().split('T')[0]
        const appointmentsOnDate = this.cases.filter(c => c.date === dateStr)
        
        dates.push({
          date: dateStr,
          day: day,
          hasAppointment: appointmentsOnDate.length > 0,
          appointmentCount: appointmentsOnDate.length
        })
      }
      return dates
    },
    upcomingCases() {
      const today = new Date().toISOString().split('T')[0]
      return this.cases
        .filter(c => c.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5)
    }
  },
  emits: ['close']
}
</script>