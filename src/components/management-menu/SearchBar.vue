<script setup>
import { Search } from 'lucide-vue-next'
</script>

<template>
  <div class="w-75 h-12 px-4 flex flex-row items-center gap-4 border-1 rounded-xl border-neutral-400">
    <Search :color="'#737373'" />
    <input
      type="text"
      placeholder="Buscar"
      class="w-full h-full pr-4 text-sm text-neutral-700 bg-transparent outline-none"
    />
  </div>
</template>

<style scoped></style>
