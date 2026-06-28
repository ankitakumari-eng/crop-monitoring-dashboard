import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatTime,
  formatDateTime,
  formatNumber,
  formatPercentage,
  timeAgo,
} from '../../../src/utils/formatters'

describe('Formatter Functions', () => {
  const testDate = new Date('2026-06-24T12:30:45Z')

  describe('Date Formatters', () => {
    it('formatDate: should format date correctly', () => {
      const result = formatDate(testDate)
      expect(result).toContain('Jun')
      expect(result).toContain('24')
    })

    it('formatTime: should format time correctly', () => {
      const result = formatTime(testDate)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(0)
    })

    it('formatDateTime: should format date and time', () => {
      const result = formatDateTime(testDate)
      expect(result).toContain('Jun')
      expect(result).toContain(':')
    })
  })

  describe('Number Formatters', () => {
    it('formatNumber: should format to 2 decimals', () => {
      expect(formatNumber(3.14159)).toBe('3.14')
      expect(formatNumber(100)).toBe('100.00')
    })

    it('formatPercentage: should format as percentage', () => {
      const result = formatPercentage(0.75)
      expect(result).toBe('75.0%')
    })
  })

  describe('Time Helpers', () => {
    it('timeAgo: should show "just now"', () => {
      const recent = new Date(Date.now() - 30000) // 30 seconds ago
      expect(timeAgo(recent)).toBe('Just now')
    })

    it('timeAgo: should show minutes', () => {
      const minutes = new Date(Date.now() - 5 * 60000) // 5 minutes ago
      expect(timeAgo(minutes)).toContain('m ago')
    })

    it('timeAgo: should show hours', () => {
      const hours = new Date(Date.now() - 3 * 3600000) // 3 hours ago
      expect(timeAgo(hours)).toContain('h ago')
    })

    it('timeAgo: should show days', () => {
      const days = new Date(Date.now() - 5 * 86400000) // 5 days ago
      expect(timeAgo(days)).toContain('d ago')
    })
  })
})