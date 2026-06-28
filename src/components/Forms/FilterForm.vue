<template>
  <div class="card">
    <h3 class="text-lg font-bold text-gray-900 mb-4">🔍 Filter Fields</h3>
    
    <div class="space-y-4">
      <!-- Status Filter -->
      <div>
        <label class="label">Filter by Status</label>
        <div class="flex gap-2">
          <button 
            v-for="status in ['all', 'healthy', 'warning', 'critical']"
            :key="status"
            @click="filters.status = status"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition',
              filters.status === status 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ statusLabel(status) }}
          </button>
        </div>
      </div>

      <!-- Crop Type Filter -->
      <div>
        <label class="label">Crop Type</label>
        <select v-model="filters.cropType" class="input">
          <option value="">All Crops</option>
          <option>Paddy</option>
          <option>Wheat</option>
          <option>Maize</option>
          <option>Groundnut</option>
          <option>Cotton</option>
        </select>
      </div>

      <!-- Area Range -->
      <div>
        <label class="label">Area Range (hectares)</label>
        <input 
          v-model.number="filters.minArea" 
          type="number" 
          placeholder="Min"
          class="input mb-2"
        >
        <input 
          v-model.number="filters.maxArea" 
          type="number" 
          placeholder="Max"
          class="input"
        >
      </div>

      <!-- Irrigation Needed -->
      <div>
        <label class="flex items-center gap-2">
          <input v-model="filters.irrigationNeeded" type="checkbox">
          <span class="text-sm font-medium">Only fields needing irrigation</span>
        </label>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 pt-4">
        <button @click="applyFilters" class="btn-primary flex-1">
          Apply Filters
        </button>
        <button @click="clearFilters" class="btn-secondary">
          Clear
        </button>
      </div>

      <!-- Results Count -->
      <p v-if="resultsCount >= 0" class="text-sm text-gray-600 text-center">
        Found {{ resultsCount }} fields
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter']);

const filters = ref({
  status: 'all',
  cropType: '',
  minArea: 0,
  maxArea: 1000,
  irrigationNeeded: false,
});

const resultsCount = ref(-1);

function statusLabel(status) {
  const labels = {
    all: 'All Fields',
    healthy: '✅ Healthy',
    warning: '⚠️ Warning',
    critical: '🔴 Critical',
  };
  return labels[status] || status;
}

function applyFilters() {
  emit('filter', filters.value);
  resultsCount.value = 5; // Placeholder
}

function clearFilters() {
  filters.value = {
    status: 'all',
    cropType: '',
    minArea: 0,
    maxArea: 1000,
    irrigationNeeded: false,
  };
  resultsCount.value = -1;
  emit('filter', null);
}
</script>

<style scoped>
</style>