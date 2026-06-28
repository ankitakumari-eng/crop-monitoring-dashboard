<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
userStore.loadUserFromStorage()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  width: 100%;
}
</style>