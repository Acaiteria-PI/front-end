<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
</script>

<template>
  <div class="w-screen flex flex-row">
    <aside>
      <SideBar />
    </aside>

    <main class="w-full">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
