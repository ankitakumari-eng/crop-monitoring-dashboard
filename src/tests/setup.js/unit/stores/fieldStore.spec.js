import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFieldStore } from '../../../src/stores/fieldStore'

describe('Field Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('should initialize with empty fields', () => {
      const store = useFieldStore()
      expect(store.fields).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should have no selected field initially', () => {
      const store = useFieldStore()
      expect(store.selectedFieldId).toBeNull()
      expect(store.selectedField).toBeUndefined()
    })
  })

  describe('Getters', () => {
    beforeEach(() => {
      const store = useFieldStore()
      store.fields = [
        { id: 1, name: 'Paddy', status: 'healthy', area: 2.5, ndvi: 0.65 },
        { id: 2, name: 'Wheat', status: 'warning', area: 3.2, ndvi: 0.58 },
        { id: 3, name: 'Maize', status: 'healthy', area: 1.8, ndvi: 0.52 },
      ]
    })

    it('should count total fields', () => {
      const store = useFieldStore()
      expect(store.fieldCount).toBe(3)
    })

    it('should calculate total area', () => {
      const store = useFieldStore()
      const total = parseFloat(store.totalArea)
      expect(total).toBeCloseTo(7.5, 1)
    })

    it('should filter healthy fields', () => {
      const store = useFieldStore()
      expect(store.healthyFields).toHaveLength(2)
      expect(store.healthyFields.every(f => f.status === 'healthy')).toBe(true)
    })

    it('should filter warning fields', () => {
      const store = useFieldStore()
      expect(store.warningFields).toHaveLength(1)
      expect(store.warningFields[0].id).toBe(2)
    })

    it('should filter critical fields', () => {
      const store = useFieldStore()
      store.fields[0].status = 'critical'
      expect(store.criticalFields).toHaveLength(1)
    })

    it('should get selected field by id', () => {
      const store = useFieldStore()
      store.selectedFieldId = 2
      expect(store.selectedField).toEqual(store.fields[1])
    })
  })

  describe('Actions', () => {
    it('should set selected field', () => {
      const store = useFieldStore()
      store.setSelectedField(1)
      expect(store.selectedFieldId).toBe(1)
    })

    it('should clear selected field', () => {
      const store = useFieldStore()
      store.selectedFieldId = 1
      store.clearSelected()
      expect(store.selectedFieldId).toBeNull()
    })

    it('should fetch fields', async () => {
      const store = useFieldStore()
      await store.fetchFields()
      expect(store.fields.length).toBeGreaterThan(0)
      expect(store.loading).toBe(false)
    })

    it('should handle fetch field by id', async () => {
      const store = useFieldStore()
      await store.fetchFieldById(1)
      expect(store.selectedFieldId).toBe(1)
    })
  })

  describe('Error Handling', () => {
    it('should handle loading state', async () => {
      const store = useFieldStore()
      const promise = store.fetchFields()
      expect(store.loading).toBe(true)
      await promise
      expect(store.loading).toBe(false)
    })
  })
})