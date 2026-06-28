<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold text-gray-900">📊 Multi-Field Comparison</h3>
      <select v-model="selectedMetric" class="px-3 py-1 border border-gray-300 rounded text-sm">
        <option value="ndvi">NDVI</option>
        <option value="ndwi">NDWI</option>
        <option value="moisture">Moisture</option>
        <option value="health">Health Score</option>
      </select>
    </div>
    <canvas ref="comparisonCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import { useFieldStore } from '../../stores/fieldStore';

const comparisonCanvas = ref(null);
const selectedMetric = ref('ndvi');
const fieldStore = useFieldStore();
let chartInstance = null;

const getChartData = () => {
  const fields = fieldStore.fields;
  const labels = fields.map(f => f.name.split('-')[0]);
  
  let datasets = [];
  
  if (selectedMetric.value === 'ndvi') {
    datasets = [{
      label: 'NDVI',
      data: fields.map(f => f.ndvi),
      backgroundColor: 'rgba(30, 64, 175, 0.7)',
    }];
  } else if (selectedMetric.value === 'ndwi') {
    datasets = [{
      label: 'NDWI',
      data: fields.map(f => f.ndwi),
      backgroundColor: 'rgba(2, 132, 199, 0.7)',
    }];
  } else if (selectedMetric.value === 'moisture') {
    datasets = [{
      label: 'Soil Moisture (%)',
      data: fields.map(f => f.soilMoisture),
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
    }];
  } else if (selectedMetric.value === 'health') {
    // Calculate health score
    const healthScores = fields.map(f => {
      const ndviScore = f.ndvi * 100;
      const moistureScore = f.soilMoisture;
      const tempScore = ((25 - Math.abs(f.temperature - 25)) / 25) * 100;
      return (ndviScore + moistureScore + tempScore) / 3;
    });
    datasets = [{
      label: 'Field Health Score',
      data: healthScores,
      backgroundColor: 'rgba(139, 92, 246, 0.7)',
    }];
  }

  return { labels, datasets };
};

const createChart = () => {
  const ctx = comparisonCanvas.value.getContext('2d');
  const data = getChartData();
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: data.datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: selectedMetric.value === 'ndvi' || selectedMetric.value === 'ndwi' ? 1 : 100,
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
};

onMounted(() => {
  createChart();
});

watch(selectedMetric, () => {
  createChart();
});
</script>

<style scoped>
</style>