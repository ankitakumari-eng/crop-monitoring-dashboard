<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold text-gray-900">💧 NDWI Trend (Water Content)</h3>
      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">30 Days</span>
    </div>
    <canvas ref="chartCanvas"></canvas>
    <p class="text-xs text-gray-600 mt-4">NDWI = Normalized Difference Water Index | Higher = More Water Content</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  
  // Generate last 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Mock NDWI data (water content indicator)
  const ndwiValues = Array.from({ length: 30 }, () => 0.45 + Math.random() * 0.25);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'NDWI',
          data: ndwiValues,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#0284c7',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: { size: 14 },
          bodyFont: { size: 12 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 0.2,
            callback: function(value) {
              return value.toFixed(1);
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
});
</script>

<style scoped>
</style>