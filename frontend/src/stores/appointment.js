import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/api'

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchMyAppointments = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/appointments/my')
      appointments.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch appointments'
    } finally {
      loading.value = false
    }
  }

  const fetchAssignedCases = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/appointments/assigned')
      appointments.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch cases'
    } finally {
      loading.value = false
    }
  }

  const fetchAllAppointments = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/appointments')
      appointments.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch appointments'
    } finally {
      loading.value = false
    }
  }

  const bookAppointment = async (formData) => {
    loading.value = true
    error.value = null
    try {
      await api.post('/appointments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      await fetchMyAppointments()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to book appointment'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStatus = async (id, status, remarks) => {
    loading.value = true
    error.value = null
    try {
      await api.patch(`/appointments/${id}/status`, { status, remarks })
      await fetchAllAppointments()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update status'
      throw err
    } finally {
      loading.value = false
    }
  }

  const reschedule = async (id, date, remarks) => {
    loading.value = true
    error.value = null
    try {
      await api.patch(`/appointments/${id}/reschedule`, { date, remarks })
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to reschedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    appointments,
    loading,
    error,
    fetchMyAppointments,
    fetchAssignedCases,
    fetchAllAppointments,
    bookAppointment,
    updateStatus,
    reschedule
  }
})
