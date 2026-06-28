<template>
  <div style="padding: 2rem;">
    <h1>Profile</h1>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const user = userStore.user
</script>