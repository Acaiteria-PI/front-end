<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
</script>

<template>
  <div class="w-full h-full flex flex-row">
    <aside>
      <SideBar />
    </aside>

    <main class="w-full h-full">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
