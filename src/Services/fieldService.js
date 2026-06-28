import { mockFields, mockAlerts } from '../data/mockFields'

export const fieldService = {
  // Mock data return करेंगे - API नहीं
  getAllFields: async () => {
    return mockFields
  },

  getFieldById: async (id) => {
    return mockFields.find(f => f.id === id)
  },

  getFieldHistory: async (fieldId) => {
    return mockFields.find(f => f.id === fieldId) || null
  }
}

export default fieldService