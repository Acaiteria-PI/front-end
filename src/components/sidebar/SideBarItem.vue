<script setup>
defineProps(['name', 'icon', 'route', 'currentTab'])

defineEmits(['enterTab'])
</script>

<template>
  <li
    @click="$emit('enterTab')"
    class="flex flex-row items-center w-[calc(15rem-24px)] h-10 py-4 px-2 gap-2 rounded-lg hover:bg-neutral-300 transition-all cursor-pointer"
    :class="currentTab == route ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
  >
    <div v-if="route == currentTab" class="identifier w-1.5 h-8 bg-pink-900 rounded-lg"></div>
    <component :is="icon" :size="20" />
    <router-link to="">{{ name }}</router-link>
  </li>
</template>

<style scoped></style>
