<script setup>
defineProps(['title'])
</script>

<template>
  <div class="w-38">
    <button
      class="w-full h-14 px-4 py-2 border border-neutral-400 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 cursor-pointer"
    >
      {{ title }}
    </button>
  </div>
</template>
