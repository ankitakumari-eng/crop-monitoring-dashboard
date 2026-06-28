import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // Farmers data directly here
  const farmers = [
    { id: 1, name: 'Ramesh Kumar', email: 'ramesh@farm.com', phone: '+91-9876543210', location: 'Odisha' },
    { id: 2, name: 'Priya Singh', email: 'priya@farm.com', phone: '+91-9876543211', location: 'Odisha' },
    { id: 3, name: 'Ajay Patel', email: 'ajay@farm.com', phone: '+91-9876543212', location: 'Odisha' },
  ]

  const getRandomFarmer = () => {
    return farmers[Math.floor(Math.random() * farmers.length)]
  }

  const user = ref(getRandomFarmer())
  const isLoggedIn = ref(false)

  const initials = computed(() => {
    if (!user.value) return 'UK'
    const parts = user.value.name.split(' ')
    return parts.map(p => p[0]).join('').toUpperCase()
  })

  const loadUserFromStorage = () => {
    user.value = getRandomFarmer()
  }

  return {
    user,
    isLoggedIn,
    initials,
    loadUserFromStorage,
  }
})