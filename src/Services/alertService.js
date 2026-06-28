import { mockAlerts } from '../data/mockFields'

export const alertService = {
  // Mock data return करेंगे
  getAllAlerts: async () => {
    return mockAlerts
  },

  getAlertsByField: async (fieldId) => {
    return mockAlerts.filter(a => a.fieldId === fieldId)
  },

  dismissAlert: async (alertId) => {
    return { success: true }
  }
}

export default alertService