<template>
  <div class="card text-center py-12">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-6">{{ description }}</p>
    <slot>
      <router-link to="/dashboard" class="btn-primary inline-block">
        ← Go Back
      </router-link>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭',
  },
  title: {
    type: String,
    default: 'No Data',
  },
  description: {
    type: String,
    default: 'No data available at the moment.',
  },
});
</script>

<style scoped>
</style>