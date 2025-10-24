<script setup>
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <div>
    <header class="sticky top-0">
      <NavBar />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
