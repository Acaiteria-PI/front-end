<script setup>
defineProps(['title', 'quantity', 'colorClass'])
</script>

<template>
  <div class="w-40 h-25 flex flex-col justify-start items-center font-bold rounded-2xl shadow-sm" :class="colorClass">
    <p class="pt-4">{{ title }}</p>
    <p class="text-center mt-1 text-3xl">24</p>
  </div>
</template>

<style scoped>
.orange {
  background-color: #f6c98e;
}
.green {
  background-color: rgba(140, 195, 167, 0.45);
}
.red {
  background-color: #EEA5A0;
}
</style>
