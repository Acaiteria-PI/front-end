<script setup>
import NavBar from './components/NavBar.vue';

const isUserLogged = true; // Fazer função de login
</script>

<template>
  <header v-if="isUserLogged">
    <NavBar />
  </header>
  <router-view />
</template>

<style scoped>

</style>
