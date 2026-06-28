<template>
  <div class="card">
    <h3 class="text-lg font-bold text-gray-900 mb-4">📍 Field Location Map</h3>
    <div ref="mapContainer" style="height: 400px; width: 100%; border-radius: 0.5rem;"></div>
    <p class="text-xs text-gray-600 mt-4">📌 Red markers = Your fields | Click to view details</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const mapContainer = ref(null);
let map = null;

const props = defineProps({
  fields: {
    type: Array,
    default: () => [
      { id: 1, name: 'Paddy Field', coordinates: { lat: 20.4625, lng: 85.8830 } },
      { id: 2, name: 'Wheat Field', coordinates: { lat: 20.1419, lng: 83.4717 } },
      { id: 3, name: 'Maize Field', coordinates: { lat: 20.8335, lng: 85.2064 } },
    ],
  },
});

onMounted(() => {
  // Initialize map
  map = L.map(mapContainer.value).setView([20.5937, 85.0], 8);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Add field markers
  props.fields.forEach((field) => {
    const marker = L.marker([field.coordinates.lat, field.coordinates.lng], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    });

    marker.bindPopup(`<strong>${field.name}</strong><br/>ID: ${field.id}`);
    marker.addTo(map);
  });

  // Fit bounds
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
});
</script>

<style scoped>
:deep(.leaflet-container) {
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>