<template>
  <div class="card">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-gray-600 text-sm">{{ label }}</p>
        <h3 class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</h3>
      </div>
      <span class="text-3xl">{{ icon }}</span>
    </div>
    <p class="text-xs text-gray-500 mt-4">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  icon: String,
  description: String,
});
</script>

<style scoped>
</style>