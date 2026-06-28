import { describe, it, expect } from 'vitest'
import {
  capitalize,
  truncate,
  slugify,
  sortByProperty,
  groupBy,
  filterByProperty,
  getUnique,
  calculateAverage,
  roundToDecimals,
  deepClone,
  mergeObjects,
  calculateFieldHealthScore,
  getIrrigationRecommendation,
  getPestRiskLevel,
} from '../../../src/utils/helpers'

describe('Helper Functions', () => {
  describe('String Helpers', () => {
    it('capitalize: should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('HELLO')).toBe('H')
    })

    it('capitalize: should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('truncate: should truncate long strings', () => {
      const long = 'This is a very long string that should be truncated'
      const result = truncate(long, 20)
      expect(result).toContain('...')
      expect(result.length).toBeLessThanOrEqual(23)
    })

    it('truncate: should not truncate short strings', () => {
      expect(truncate('Hello', 10)).toBe('Hello')
    })

    it('slugify: should convert to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Test 123')).toBe('test-123')
    })

    it('slugify: should handle special characters', () => {
      expect(slugify('Hello @#$ World')).toBe('hello-world')
    })
  })

  describe('Array Helpers', () => {
    const testArray = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]

    it('sortByProperty: should sort ascending', () => {
      const sorted = sortByProperty(testArray, 'age', true)
      expect(sorted[0].age).toBe(25)
      expect(sorted[2].age).toBe(35)
    })

    it('sortByProperty: should sort descending', () => {
      const sorted = sortByProperty(testArray, 'age', false)
      expect(sorted[0].age).toBe(35)
      expect(sorted[2].age).toBe(25)
    })

    it('groupBy: should group by property', () => {
      const grouped = groupBy(testArray, 'age')
      expect(Object.keys(grouped)).toHaveLength(3)
    })

    it('filterByProperty: should filter by property value', () => {
      const filtered = filterByProperty(testArray, 'name', 'Alice')
      expect(filtered).toHaveLength(1)
      expect(filtered[0].name).toBe('Alice')
    })

    it('getUnique: should get unique values', () => {
      const arr = [
        { type: 'A' },
        { type: 'B' },
        { type: 'A' },
        { type: 'C' },
      ]
      const unique = getUnique(arr, 'type')
      expect(unique).toHaveLength(3)
      expect(unique).toContain('A')
    })
  })

  describe('Number Helpers', () => {
    it('calculateAverage: should calculate average', () => {
      const arr = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
      ]
      expect(calculateAverage(arr, 'value')).toBe(20)
    })

    it('calculateAverage: should handle empty array', () => {
      expect(calculateAverage([], 'value')).toBeNaN()
    })

    it('roundToDecimals: should round to decimals', () => {
      expect(roundToDecimals(3.14159, 2)).toBe(3.14)
      expect(roundToDecimals(3.14159, 3)).toBe(3.142)
    })
  })

  describe('Object Helpers', () => {
    it('deepClone: should create deep copy', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)
      cloned.b.c = 999
      expect(original.b.c).toBe(2)
    })

    it('mergeObjects: should merge multiple objects', () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = { b: 3, c: 4 }
      const merged = mergeObjects(obj1, obj2)
      expect(merged).toEqual({ a: 1, b: 3, c: 4 })
    })
  })

  describe('Field Helpers', () => {
    const mockField = {
      ndvi: 0.65,
      soilMoisture: 60,
      temperature: 25,
    }

    it('calculateFieldHealthScore: should calculate health score', () => {
      const score = calculateFieldHealthScore(mockField)
      expect(score).toBeGreaterThan(0)
      expect(score).toBeLessThanOrEqual(100)
    })

    it('getIrrigationRecommendation: should recommend irrigation', () => {
      const field = { ...mockField, soilMoisture: 25 }
      const rec = getIrrigationRecommendation(field)
      expect(rec.severity).toBe('high')
    })

    it('getIrrigationRecommendation: should warn about waterlogging', () => {
      const field = { ...mockField, soilMoisture: 85 }
      const rec = getIrrigationRecommendation(field)
      expect(rec.severity).toBe('warning')
    })

    it('getPestRiskLevel: should calculate pest risk', () => {
      const field = { humidity: 75, temperature: 28 }
      const risk = getPestRiskLevel(field)
      expect(['low', 'medium', 'high']).toContain(risk)
    })
  })
})