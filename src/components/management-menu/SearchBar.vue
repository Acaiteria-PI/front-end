<script setup>
import { Search } from 'lucide-vue-next'
</script>

<template>
  <div
    class="lg:w-96 h-10 px-3 flex flex-row items-center gap-3 border rounded-xl border-neutral-400"
  >
    <Search :color="'#737373'" class="w-4 h-4" />
    <input
      type="text"
      placeholder="Buscar"
      class="w-full h-full text-sm text-neutral-700 bg-transparent outline-none"
    />
  </div>
</template>

<style scoped></style>
