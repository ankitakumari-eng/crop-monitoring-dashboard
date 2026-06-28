<template>
  <span :class="['px-3 py-1 rounded-full text-xs font-semibold', typeClass]">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value),
  },
});

const typeClass = computed(() => {
  const types = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };
  return types[props.type];
});
</script>

<style scoped>
</style>