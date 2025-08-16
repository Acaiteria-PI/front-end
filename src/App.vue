<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth.js'
import NavBar from './components/NavBar.vue';

const authStore = useAuth()
const route = useRoute()

onMounted(() => {
  const token = localStorage.getItem('access')
  if (token) {
  authStore.fetchCurrentUser()
  }
})
</script>

<template>
  <header>
    <NavBar />
  </header>
  <router-view />
</template>

<style scoped>

</style>
