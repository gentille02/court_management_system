export function useStatusClass() {
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

  return { getStatusClass }
}