<script setup>
import { useRoute } from 'vue-router'
import { useBreakpoint } from '@/composables/useBreakpoint.js'
import NavBar from './components/NavBar.vue'
import MobileNavBar from '@/components/MobileNavBar.vue'

const route = useRoute()
const { isDesktop } = useBreakpoint(768)
</script>

<template>
  <div>
    <div v-if="route.name !== 'login'">
      <header v-if="isDesktop" class="sticky top-0">
        <NavBar />
      </header>

      <div v-else class="bottom-0 fixed w-full px-4 pb-2">
        <MobileNavBar />
      </div>
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
