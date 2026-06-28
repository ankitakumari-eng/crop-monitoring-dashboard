<template>
  <teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-scaleIn">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
          <button 
            @click="close" 
            class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button @click="close" class="btn-secondary flex-1">
            {{ cancelText }}
          </button>
          <button @click="confirm" class="btn-primary flex-1">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
});

const emit = defineEmits(['close', 'confirm']);

function close() {
  emit('close');
}

function confirm() {
  emit('confirm');
}
</script>

<style scoped>
</style>