<template>
  <div style="padding: 2rem;">
    <button @click="$router.back()" style="padding: 0.5rem 1rem; cursor: pointer;">← Back</button>
    <div v-if="field">
      <h1>{{ field.name }}</h1>
      <p>{{ field.location }}</p>
      <p>Area: {{ field.area }} hectares</p>
    </div>
    <div v-else>
      <p>Field not found</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFieldStore } from '../stores/fieldStore'

const route = useRoute()
const fieldStore = useFieldStore()
const field = computed(() => fieldStore.fields.find(f => f.id === parseInt(route.params.id)))
fieldStore.fetchFields()
</script>