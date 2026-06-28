<template>
  <div class="card cursor-pointer hover:border-primary border-2 border-transparent transition" @click="goToDetail">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-bold text-gray-900">{{ field.name }}</h3>
      <span :class="['px-3 py-1 rounded-full text-xs font-semibold', statusColor]">
        {{ field.status }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-gray-600 text-xs">Crop Type</p>
        <p class="text-gray-900 font-semibold">{{ field.cropType }}</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">Area</p>
        <p class="text-gray-900 font-semibold">{{ field.area }} ha</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">NDVI</p>
        <p class="text-gray-900 font-semibold">{{ field.ndvi.toFixed(2) }}</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">Moisture</p>
        <p class="text-gray-900 font-semibold">{{ field.moisture }}%</p>
      </div>
    </div>

    <button class="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700">
      View Details →
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  field: Object,
});

const statusColor = computed(() => {
  if (props.field.status === 'healthy') return 'bg-green-100 text-green-800';
  if (props.field.status === 'warning') return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
});

function goToDetail() {
  router.push(`/field/${props.field.id}`);
}
</script>

<style scoped>
</style>