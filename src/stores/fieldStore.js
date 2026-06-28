import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFieldStore = defineStore('field', () => {
  // Data directly here - no imports!
  const fieldsData = [
    {
      id: 1,
      name: 'Paddy Field A',
      location: 'Block 1, Odisha',
      crop: 'Rice',
      area: 4.5,
      status: 'healthy',
    },
    {
      id: 2,
      name: 'Wheat Field B',
      location: 'Block 2, Odisha',
      crop: 'Wheat',
      area: 3.2,
      status: 'warning',
    },
    {
      id: 3,
      name: 'Maize Field C',
      location: 'Block 3, Odisha',
      crop: 'Maize',
      area: 5.0,
      status: 'healthy',
    },
  ]

  const fields = ref([...fieldsData])
  const loading = ref(false)

  const healthyFields = computed(() =>
    fields.value.filter(f => f.status === 'healthy')
  )

  const fetchFields = () => {
    loading.value = false
  }

  return {
    fields,
    loading,
    healthyFields,
    fetchFields,
  }
})