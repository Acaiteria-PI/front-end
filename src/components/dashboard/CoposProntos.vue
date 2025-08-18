<script setup>
const finalCups = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
]

const combos = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
]
</script>

<template>
  <div class="mt-16 flex flex-col">
    <h1 class="text-3xl">Copos prontos</h1>
    <div class="flex flex-wrap justify-start gap-6 mt-6">
      <div class="bg-neutral-300 w-50 h-60 rounded-2xl" v-for="cup in finalCups" :key="cup.id"></div>
    </div>
    <h1 class="text-3xl mt-16">Combos</h1>
    <div class="flex flex-wrap justify-start gap-6 mt-6">
      <div class="bg-neutral-300 w-50 h-60 rounded-2xl" v-for="combo in combos" :key="combo.id"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
