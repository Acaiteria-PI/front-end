<script setup>
defineProps(['title', 'description', 'icon', 'iconColor'])
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm p-8 cursor-pointer transition-all duration-200 hover:shadow-md border border-gray-100"
  >
    <div class="flex flex-col items-center text-center space-y-6">
      <div class="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center">
        <Component :is="icon" :size="32" stroke-width="2" :color="iconColor"/>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          {{ title }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
