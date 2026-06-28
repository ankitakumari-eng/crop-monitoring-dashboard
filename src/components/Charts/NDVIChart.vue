<template>
  <div class="card">
    <h3 class="text-lg font-bold text-gray-900 mb-4">📈 NDVI Trend (30 Days)</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);

const props = defineProps({
  fieldName: String,
});

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  
  // Mock data - last 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const ndviValues = Array.from({ length: 30 }, () => 0.55 + Math.random() * 0.15);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'NDVI',
          data: ndviValues,
          borderColor: '#1e40af',
          backgroundColor: 'rgba(30, 64, 175, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#1e40af',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 0.2,
          },
        },
      },
    },
  });
});
</script>

<style scoped>
</style>