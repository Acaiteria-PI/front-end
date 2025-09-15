<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
</script>

<template>
  <div class="w-screen h-full flex flex-row">
    <aside>
      <SideBar />
    </aside>

    <main class="w-full h-full relative">
      <router-view />
      <!--      <h1 class="text-4xl font-bold absolute inset-0 m-auto mt-8 text-center">Menu de gerenciamento</h1>-->
    </main>
  </div>
</template>

<style scoped></style>
