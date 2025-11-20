<script setup>
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useBreakpoint } from '@/composables/useBreakpoint.js'
import MobileNavBar from '@/components/MobileNavBar.vue'

const route = useRoute()
const { isDesktop } = useBreakpoint(768)
</script>

<template>
  <div>
    <header v-if="isDesktop" class="sticky top-0">
      <NavBar />
    </header>

    <div v-else class="bottom-0 fixed w-full px-4 pb-2 z-999">
      <MobileNavBar />
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
