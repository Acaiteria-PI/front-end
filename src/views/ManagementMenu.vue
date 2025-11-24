<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="flex flex-row">
    <aside>
      <SideBar />
    </aside>

    <main class="w-full h-full">
      <router-view />
        <div v-if="route.path === '/management-menu'" class="w-full h-full relative flex flex-col align-start justify-center gap-8">
        <h1 class="text-4xl font-bold mt-8 text-center">Menu de
          gerenciamento</h1>
        <h2 class="text-3xl font-semibold text-center">Selecione a
          seção ao lado</h2>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
