<script setup>
import { useRoute } from 'vue-router'
import SideBar from '@/components/sidebar/SideBar.vue'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  console.log(route.name)
})
</script>

<template>
  <div class="w-full h-full flex flex-row">
    <aside>
      <SideBar />
    </aside>

    <main class="w-full h-full">
      <router-view v-if="route.name !== 'management-menu'" />
      <h1 v-else class="text-5xl font-medium">Management Menu</h1>
    </main>
  </div>
</template>

<style scoped></style>
