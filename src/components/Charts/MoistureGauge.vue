<template>
  <div class="card">
    <h3 class="text-lg font-bold text-gray-900 mb-4">💧 Soil Moisture</h3>
    <div class="flex items-center justify-center">
      <div class="text-center">
        <div class="relative w-32 h-32 mx-auto">
          <svg viewBox="0 0 200 200" class="w-full h-full">
            <!-- Background circle -->
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" stroke-width="15"/>
            <!-- Progress circle -->
            <circle 
              cx="100" 
              cy="100" 
              r="90" 
              fill="none"
              :stroke="moistureColor"
              stroke-width="15"
              stroke-dasharray="565.48"
              :stroke-dashoffset="565.48 - (565.48 * moisture) / 100"
              style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.5s"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div>
              <p class="text-4xl font-bold text-gray-900">{{ moisture }}%</p>
              <p class="text-xs text-gray-600">{{ moistureStatus }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  moisture: {
    type: Number,
    default: 50,
  },
});

const moistureColor = computed(() => {
  if (props.moisture < 30) return '#dc2626'; // Red - Too dry
  if (props.moisture < 50) return '#ea580c'; // Orange - Low
  if (props.moisture < 70) return '#16a34a'; // Green - Good
  return '#0284c7'; // Blue - Too wet
});

const moistureStatus = computed(() => {
  if (props.moisture < 30) return 'Very Dry ⚠️';
  if (props.moisture < 50) return 'Low 📉';
  if (props.moisture < 70) return 'Optimal ✅';
  return 'High ⚠️';
});
</script>

<style scoped>
</style>