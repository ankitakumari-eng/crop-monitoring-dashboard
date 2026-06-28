export const smsService = {
  // Mock SMS service
  sendSMSAdvisory: async (phoneNumber, message) => {
    console.log(`📱 SMS sent to ${phoneNumber}: ${message}`)
    return { success: true, messageId: Math.random() }
  },

  getSMSHistory: async () => {
    return []
  }
}

export default smsService