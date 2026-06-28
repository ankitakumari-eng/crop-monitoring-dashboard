<template>
  <div :class="['card border-l-4', severityClass]">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <h4 class="font-bold text-gray-900">{{ severityIcon }} {{ alert.message }}</h4>
        <p class="text-sm text-gray-600 mt-2">{{ alert.recommendation }}</p>
      </div>
      <button @click="markAsRead" class="text-gray-400 hover:text-gray-600">✕</button>
    </div>
    <p class="text-xs text-gray-500 mt-3">{{ timeAgo }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  alert: Object,
});

const emit = defineEmits(['dismiss']);

const severityClass = computed(() => {
  if (props.alert.severity === 'high') return 'border-red-500 bg-red-50';
  if (props.alert.severity === 'medium') return 'border-yellow-500 bg-yellow-50';
  return 'border-blue-500 bg-blue-50';
});

const severityIcon = computed(() => {
  if (props.alert.severity === 'high') return '🔴';
  if (props.alert.severity === 'medium') return '🟡';
  return '🔵';
});

const timeAgo = computed(() => {
  const now = new Date();
  const alertTime = new Date(props.alert.createdAt);
  const diff = Math.floor((now - alertTime) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
});

function markAsRead() {
  emit('dismiss');
}
</script>

<style scoped>
</style>