import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAlertStore } from '../../../src/stores/alertStore'

describe('Alert Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('should initialize with empty alerts', () => {
      const store = useAlertStore()
      expect(store.alerts).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('Getters', () => {
    beforeEach(() => {
      const store = useAlertStore()
      store.alerts = [
        { id: 1, fieldId: 1, severity: 'high', status: 'active', message: 'High alert' },
        { id: 2, fieldId: 1, severity: 'medium', status: 'active', message: 'Medium alert' },
        { id: 3, fieldId: 2, severity: 'high', status: 'active', message: 'Another high' },
        { id: 4, fieldId: 2, severity: 'low', status: 'active', message: 'Low alert' },
      ]
    })

    it('should count total alerts', () => {
      const store = useAlertStore()
      expect(store.alertCount).toBe(4)
    })

    it('should filter high severity alerts', () => {
      const store = useAlertStore()
      expect(store.highSeverityAlerts).toHaveLength(2)
      expect(store.highSeverityAlerts.every(a => a.severity === 'high')).toBe(true)
    })

    it('should filter medium severity alerts', () => {
      const store = useAlertStore()
      expect(store.mediumSeverityAlerts).toHaveLength(1)
      expect(store.mediumSeverityAlerts[0].id).toBe(2)
    })

    it('should get only active alerts', () => {
      const store = useAlertStore()
      store.alerts[0].status = 'dismissed'
      expect(store.activeAlerts).toHaveLength(3)
    })
  })

  describe('Actions', () => {
    beforeEach(() => {
      const store = useAlertStore()
      store.alerts = [
        { id: 1, fieldId: 1, severity: 'high', status: 'active' },
        { id: 2, fieldId: 1, severity: 'medium', status: 'active' },
      ]
    })

    it('should fetch all alerts', async () => {
      const store = useAlertStore()
      await store.fetchAlerts()
      expect(store.alerts.length).toBeGreaterThan(0)
    })

    it('should fetch alerts by field', async () => {
      const store = useAlertStore()
      await store.fetchAlertsByField(1)
      expect(store.alerts.length).toBeGreaterThan(0)
    })

    it('should dismiss alert', async () => {
      const store = useAlertStore()
      const initialCount = store.alerts.length
      await store.dismissAlert(1)
      expect(store.alerts.length).toBeLessThan(initialCount)
    })

    it('should clear all alerts', () => {
      const store = useAlertStore()
      store.clearAlerts()
      expect(store.alerts).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle loading state', async () => {
      const store = useAlertStore()
      const promise = store.fetchAlerts()
      expect(store.loading).toBe(true)
      await promise
      expect(store.loading).toBe(false)
    })
  })
})