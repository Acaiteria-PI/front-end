<script setup>
defineProps(['stats'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm text-gray-600 mb-1">{{ stat.label }}</p>
          <h2 class="text-4xl font-bold text-gray-900 mb-2">{{ stat.value }}</h2>
          <p
            class="text-xs"
            :class="stat.changePositive ? 'text-green-600' : 'text-gray-500'"
          >
            {{ stat.change }}
          </p>
        </div>
        <div :class="`${stat.bgColor} p-4 rounded-lg`">
          <component :is="stat.icon" :size="32" :class="stat.iconColor" />
        </div>
      </div>
    </div>
  </div>
</template>
