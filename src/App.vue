<script setup>
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue';

const route = useRoute()
</script>

<template>
  <header>
    <NavBar />
  </header>
  <router-view />
</template>

<style scoped>

</style>
