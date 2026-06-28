<template>
  <div style="padding: 2rem;">
    <h1>Alerts</h1>
    <div v-for="a in alerts" :key="a.id" style="border: 1px solid #ddd; padding: 1rem; margin: 0.5rem 0;">
      <p><strong>{{ a.message }}</strong></p>
      <p>Severity: {{ a.severity }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAlertStore } from '../stores/alertStore'

const alertStore = useAlertStore()
const alerts = computed(() => alertStore.alerts)
alertStore.fetchAlerts()
</script>