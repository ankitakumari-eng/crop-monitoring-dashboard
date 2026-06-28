<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1>🌾 ISRO Crop Monitoring Dashboard</h1>
    <p>Welcome {{ user.name }}!</p>

    <div style="margin-top: 20px;">
      <h2>📊 Statistics</h2>
      <p>✅ Total Fields: {{ fields.length }}</p>
      <p>🌱 Healthy Fields: {{ healthyFields.length }}</p>
      <p>⚠️ Active Alerts: {{ alerts.length }}</p>
    </div>

    <div style="margin-top: 30px;">
      <h2>🌾 Your Fields</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="border: 1px solid #ddd; padding: 10px;">Field Name</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Location</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fields" :key="field.id">
            <td style="border: 1px solid #ddd; padding: 10px;">{{ field.name }}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">{{ field.location }}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">
              <span
                :style="{
                  color: field.status === 'healthy' ? 'green' : field.status === 'warning' ? 'orange' : 'red',
                }"
              >
                {{ field.status === 'healthy' ? '🟢' : '🟡' }} {{ field.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFieldStore } from '../stores/fieldStore'
import { useAlertStore } from '../stores/alertStore'
import { useUserStore } from '../stores/userStore'

const fieldStore = useFieldStore()
const alertStore = useAlertStore()
const userStore = useUserStore()

const fields = computed(() => fieldStore.fields)
const healthyFields = computed(() => fieldStore.healthyFields)
const alerts = computed(() => alertStore.alerts)
const user = computed(() => userStore.user)

fieldStore.fetchFields()
alertStore.fetchAlerts()
</script>