import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../../src/stores/userStore'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('should initialize with default user', () => {
      const store = useUserStore()
      expect(store.user).toBeDefined()
      expect(store.user.name).toBe('Ramesh Kumar')
      expect(store.isLoggedIn).toBe(true)
    })

    it('should have no loading or error initially', () => {
      const store = useUserStore()
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('Getters', () => {
    it('should get full name', () => {
      const store = useUserStore()
      expect(store.fullName).toBe('Ramesh Kumar')
    })

    it('should check if user is farmer', () => {
      const store = useUserStore()
      expect(store.isFarmer).toBe(true)
    })

    it('should check if user is admin', () => {
      const store = useUserStore()
      store.user.role = 'admin'
      expect(store.isAdmin).toBe(true)
      expect(store.isFarmer).toBe(false)
    })

    it('should calculate initials from name', () => {
      const store = useUserStore()
      store.user.name = 'Ramesh Kumar'
      expect(store.initials).toBe('RK')
    })

    it('should handle initials for single name', () => {
      const store = useUserStore()
      store.user.name = 'Ramesh'
      expect(store.initials).toBe('R')
    })
  })

  describe('Actions', () => {
    it('should update user profile', () => {
      const store = useUserStore()
      store.updateProfile({
        name: 'New Name',
        phone: '9999999999',
      })
      expect(store.user.name).toBe('New Name')
      expect(store.user.phone).toBe('9999999999')
    })

    it('should set user data', () => {
      const store = useUserStore()
      const newData = {
        name: 'Test User',
        email: 'test@example.com',
      }
      store.setUser(newData)
      expect(store.user.name).toBe('Test User')
      expect(store.user.email).toBe('test@example.com')
    })

    it('should handle login with valid credentials', async () => {
      const store = useUserStore()
      const result = await store.login('9876543210', 'password')
      expect(result.success).toBe(true)
      expect(store.isLoggedIn).toBe(true)
    })

    it('should reject login with invalid credentials', async () => {
      const store = useUserStore()
      const result = await store.login('9999999999', 'wrongpass')
      expect(result.success).toBe(false)
      expect(store.error).toBeDefined()
    })

    it('should handle logout', async () => {
      const store = useUserStore()
      store.isLoggedIn = true
      await store.logout()
      expect(store.isLoggedIn).toBe(false)
      expect(store.user.isAuthenticated).toBe(false)
    })

    it('should load user from storage', () => {
      const store = useUserStore()
      const userData = {
        name: 'Stored User',
        phone: '1234567890',
      }
      localStorage.setItem('user', JSON.stringify(userData))
      store.loadUserFromStorage()
      expect(store.user.name).toBe('Stored User')
    })
  })

  describe('Error Handling', () => {
    it('should handle corrupted storage data', () => {
      localStorage.setItem('user', 'invalid json')
      const store = useUserStore()
      expect(() => store.loadUserFromStorage()).not.toThrow()
    })
  })
})