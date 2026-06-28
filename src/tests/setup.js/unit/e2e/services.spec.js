import { describe, it, expect, beforeEach } from 'vitest'
import { fieldService } from '../../src/services/fieldService'
import { alertService } from '../../src/services/alertService'
import { smsService } from '../../src/services/smsService'

describe('Services E2E Tests', () => {
  describe('Field Service', () => {
    it('should fetch all fields', async () => {
      const fields = await fieldService.getAllFields()
      expect(Array.isArray(fields)).toBe(true)
      expect(fields.length).toBeGreaterThan(0)
    })

    it('should fetch single field by id', async () => {
      const field = await fieldService.getFieldById(1)
      expect(field).toBeDefined()
      expect(field.id).toBe(1)
    })

    it('should handle field update', async () => {
      const updateData = { name: 'Updated Field' }
      const result = await fieldService.updateField(1, updateData)
      expect(result).toBeDefined()
    })

    it('should fetch field history', async () => {
      const history = await fieldService.getFieldHistory(1)
      expect(Array.isArray(history)).toBe(true)
    })
  })

  describe('Alert Service', () => {
    it('should fetch all alerts', async () => {
      const alerts = await alertService.getAllAlerts()
      expect(Array.isArray(alerts)).toBe(true)
    })

    it('should fetch field-specific alerts', async () => {
      const alerts = await alertService.getAlertsByField(1)
      expect(Array.isArray(alerts)).toBe(true)
    })

    it('should create alert', async () => {
      const alertData = {
        fieldId: 1,
        type: 'test',
        severity: 'low',
        message: 'Test alert',
      }
      const result = await alertService.createAlert(alertData)
      expect(result).toBeDefined()
    })

    it('should dismiss alert', async () => {
      const result = await alertService.dismissAlert(1)
      expect(result.success).toBe(true)
    })
  })

  describe('SMS Service', () => {
    it('should send SMS advisory', async () => {
      const result = await smsService.sendSMSAdvisory(
        1,
        1,
        'Test message'
      )
      expect(result.success).toBe(true)
    })

    it('should get SMS history', async () => {
      const history = await smsService.getSMSHistory(1)
      expect(Array.isArray(history)).toBe(true)
    })

    it('should send bulk SMS', async () => {
      const result = await smsService.sendBulkSMS(
        [1, 2],
        'Bulk test message'
      )
      expect(result.success).toBe(true)
      expect(result.count).toBe(2)
    })
  })
})