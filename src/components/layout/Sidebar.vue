<template>
  <aside class="w-64 bg-gray-900 text-white min-h-screen">
    <nav class="p-4 space-y-2">
      <router-link 
        to="/dashboard" 
        class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        :class="{ 'bg-primary': $route.path === '/dashboard' }"
      >
        📊 Dashboard
      </router-link>

      <router-link 
        to="/fields" 
        class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        :class="{ 'bg-primary': $route.path === '/fields' }"
      >
        🌾 My Fields
      </router-link>

      <router-link 
        to="/alerts" 
        class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        :class="{ 'bg-primary': $route.path === '/alerts' }"
      >
        ⚠️ Alerts
      </router-link>

      <router-link 
        to="/profile" 
        class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        :class="{ 'bg-primary': $route.path === '/profile' }"
      >
        👤 Profile
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
</style>