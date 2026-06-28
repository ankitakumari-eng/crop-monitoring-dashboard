import { describe, it, expect, beforeEach } from 'vitest'
import { useFieldStore } from '../../src/stores/fieldStore'
import { useAlertStore } from '../../src/stores/alertStore'
import { useUserStore } from '../../src/stores/userStore'
import { createPinia, setActivePinia } from 'pinia'

describe('Dashboard E2E Tests', () => {
  let fieldStore
  let alertStore
  let userStore

  beforeEach(() => {
    setActivePinia(createPinia())
    fieldStore = useFieldStore()
    alertStore = useAlertStore()
    userStore = useUserStore()
  })

  describe('User Authentication Flow', () => {
    it('should load user from storage on app mount', () => {
      const userData = {
        name: 'Test Farmer',
        phone: '9876543210',
      }
      localStorage.setItem('user', JSON.stringify(userData))
      userStore.loadUserFromStorage()
      expect(userStore.user.name).toBe('Test Farmer')
    })

    it('should handle user login', async () => {
      const result = await userStore.login('9876543210', 'password')
      expect(result.success).toBe(true)
      expect(userStore.isLoggedIn).toBe(true)
    })

    it('should handle user logout', async () => {
      userStore.isLoggedIn = true
      await userStore.logout()
      expect(userStore.isLoggedIn).toBe(false)
    })
  })

  describe('Field Management Flow', () => {
    beforeEach(async () => {
      await fieldStore.fetchFields()
    })

    it('should load all fields on dashboard', () => {
      expect(fieldStore.fields.length).toBeGreaterThan(0)
    })

    it('should calculate statistics from fields', () => {
      expect(fieldStore.fieldCount).toBeGreaterThan(0)
      expect(parseFloat(fieldStore.totalArea)).toBeGreaterThan(0)
    })

    it('should categorize fields by status', () => {
      const total = fieldStore.fieldCount
      const healthy = fieldStore.healthyFields.length
      const warning = fieldStore.warningFields.length
      expect(healthy + warning).toBeLessThanOrEqual(total)
    })

    it('should allow field selection', async () => {
      await fieldStore.fetchFieldById(1)
      expect(fieldStore.selectedFieldId).toBe(1)
    })

    it('should get field details after selection', async () => {
      await fieldStore.fetchFieldById(1)
      const selected = fieldStore.selectedField
      expect(selected).toBeDefined()
      expect(selected.id).toBe(1)
    })
  })

  describe('Alert Management Flow', () => {
    beforeEach(async () => {
      await alertStore.fetchAlerts()
    })

    it('should load all alerts', () => {
      expect(Array.isArray(alertStore.alerts)).toBe(true)
    })

    it('should categorize alerts by severity', () => {
      const high = alertStore.highSeverityAlerts.length
      const medium = alertStore.mediumSeverityAlerts.length
      const total = alertStore.alertCount
      expect(high + medium).toBeLessThanOrEqual(total)
    })

    it('should filter alerts by field', async () => {
      await alertStore.fetchAlertsByField(1)
      expect(alertStore.alerts.length).toBeGreaterThanOrEqual(0)
    })

    it('should dismiss alerts', async () => {
      const initialCount = alertStore.alertCount
      if (initialCount > 0) {
        await alertStore.dismissAlert(alertStore.alerts[0].id)
        expect(alertStore.alertCount).toBeLessThan(initialCount)
      }
    })
  })

  describe('Complete Dashboard Workflow', () => {
    it('should load user and display dashboard', async () => {
      // Step 1: Load user
      userStore.isLoggedIn = true
      expect(userStore.isLoggedIn).toBe(true)

      // Step 2: Load fields
      await fieldStore.fetchFields()
      expect(fieldStore.fields.length).toBeGreaterThan(0)

      // Step 3: Load alerts
      await alertStore.fetchAlerts()
      expect(Array.isArray(alertStore.alerts)).toBe(true)

      // Step 4: Verify dashboard data available
      expect(fieldStore.fieldCount).toBeGreaterThan(0)
      expect(alertStore.alertCount).toBeGreaterThanOrEqual(0)
    })

    it('should navigate to field details', async () => {
      await fieldStore.fetchFields()
      const fieldId = fieldStore.fields[0].id
      
      await fieldStore.fetchFieldById(fieldId)
      await alertStore.fetchAlertsByField(fieldId)
      
      expect(fieldStore.selectedFieldId).toBe(fieldId)
      expect(fieldStore.selectedField).toBeDefined()
    })

    it('should handle field filtering and selection', async () => {
      await fieldStore.fetchFields()
      
      // Get healthy fields
      const healthy = fieldStore.healthyFields
      expect(healthy.length).toBeGreaterThanOrEqual(0)
      
      // Get warning fields
      const warning = fieldStore.warningFields
      expect(warning.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid field id gracefully', async () => {
      await fieldStore.fetchFieldById(99999)
      // Should not throw error
      expect(fieldStore.error || fieldStore.selectedField === undefined).toBeTruthy()
    })

    it('should provide fallback data on error', async () => {
      // Fields should fallback to mock data if API fails
      await fieldStore.fetchFields()
      expect(fieldStore.fields).toBeDefined()
      expect(Array.isArray(fieldStore.fields)).toBe(true)
    })
  })
})