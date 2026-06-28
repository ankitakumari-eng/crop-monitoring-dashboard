import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  // Data directly here - no imports!
  const alertsData = [
    { id: 1, fieldId: 1, message: 'Moisture stress detected', severity: 'warning' },
    { id: 2, fieldId: 2, message: 'Irrigation needed soon', severity: 'critical' },
    { id: 3, fieldId: 3, message: 'Normal conditions', severity: 'info' },
  ]

  const alerts = ref([...alertsData])
  const loading = ref(false)

  const alertCount = computed(() => alerts.value.length)

  const fetchAlerts = () => {
    loading.value = false
  }

  return {
    alerts,
    loading,
    alertCount,
    fetchAlerts,
  }
})