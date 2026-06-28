import { describe, it, expect } from 'vitest'
import {
  isValidPhone,
  isValidEmail,
  isValidFieldName,
  isValidArea,
} from '../../../src/utils/validators'

describe('Validator Functions', () => {
  describe('Phone Validation', () => {
    it('should validate correct phone number', () => {
      expect(isValidPhone('9876543210')).toBe(true)
    })

    it('should reject short phone number', () => {
      expect(isValidPhone('987654')).toBe(false)
    })

    it('should reject long phone number', () => {
      expect(isValidPhone('98765432101')).toBe(false)
    })

    it('should reject non-numeric', () => {
      expect(isValidPhone('987654321a')).toBe(false)
    })
  })

  describe('Email Validation', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('should reject email without @', () => {
      expect(isValidEmail('testexample.com')).toBe(false)
    })

    it('should reject email without domain', () => {
      expect(isValidEmail('test@')).toBe(false)
    })
  })

  describe('Field Name Validation', () => {
    it('should validate correct field name', () => {
      expect(isValidFieldName('Paddy Field')).toBe(true)
    })

    it('should reject short name', () => {
      expect(isValidFieldName('ab')).toBe(false)
    })

    it('should reject long name', () => {
      expect(isValidFieldName('a'.repeat(101))).toBe(false)
    })

    it('should reject empty name', () => {
      expect(isValidFieldName('')).toBe(false)
    })
  })

  describe('Area Validation', () => {
    it('should validate correct area', () => {
      expect(isValidArea('2.5')).toBe(true)
    })

    it('should reject zero area', () => {
      expect(isValidArea('0')).toBe(false)
    })

    it('should reject negative area', () => {
      expect(isValidArea('-5')).toBe(false)
    })

    it('should reject area over 1000', () => {
      expect(isValidArea('1001')).toBe(false)
    })
  })
})