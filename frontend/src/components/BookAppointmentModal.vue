<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" style="background: var(--bg-card);">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold" style="color: var(--text-1);">📅 Book Appointment</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <form @submit.prevent="$emit('submit')" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Court Service</label>
          <select v-model="formData.service" required class="input-field">
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
          <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Preferred Date</label>
          <input v-model="formData.date" type="date" required class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Description</label>
          <textarea v-model="formData.description" rows="3" class="input-field"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" style="color: var(--text-2);">Upload Documents</label>
          <input @change="$emit('file-upload', $event)" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="input-field" />
          <p class="text-xs mt-1" style="color: var(--text-3);">PDF, JPG, PNG (Max 5MB each)</p>
        </div>

        <div class="flex gap-3">
          <button type="submit" class="flex-1 px-4 py-2 rounded-lg font-medium" style="background: var(--accent-client); color: white;">
            Book Appointment
          </button>
          <button type="button" @click="$emit('close')" class="flex-1 px-4 py-2 rounded-lg" style="background: var(--bg-hover); color: var(--text-2); border: 1px solid var(--border);">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookAppointmentModal',
  props: {
    show: Boolean,
    formData: Object
  },
  emits: ['close', 'submit', 'file-upload']
}
</script>