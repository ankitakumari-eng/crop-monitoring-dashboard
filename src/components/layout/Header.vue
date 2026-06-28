<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="/isro-logo.png" alt="ISRO" class="h-8 w-8">
          <span class="ml-2 text-xl font-bold text-primary">CropMonitor</span>
        </div>

        <!-- Title -->
        <h1 class="text-lg font-semibold text-gray-900">Crop Monitoring Dashboard</h1>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            🔔
            <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Profile -->
          <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <div class="h-8 w-8 bg-primary rounded-full text-white flex items-center justify-center text-sm font-bold">
              👨‍🌾
            </div>
            <span class="text-sm font-medium">Farmer</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header component - No logic needed
</script>

<style scoped>
</style>