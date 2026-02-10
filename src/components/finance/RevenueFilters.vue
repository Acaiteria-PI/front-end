<script setup>
defineProps({
  selectedMonthUi: {
    type: String,
    default: '',
  },
  selectedStartDateUi: {
    type: String,
    default: '',
  },
  selectedEndDateUi: {
    type: String,
    default: '',
  },
  isRefreshing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:selectedMonthUi',
  'update:selectedStartDateUi',
  'update:selectedEndDateUi',
  'refresh',
])
</script>

<template>
  <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-600">Mes</label>
        <input
          :value="selectedMonthUi"
          type="month"
          class="h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
          @input="emit('update:selectedMonthUi', $event.target.value)"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-600">Data inicial</label>
        <input
          :value="selectedStartDateUi"
          type="date"
          class="h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
          @input="emit('update:selectedStartDateUi', $event.target.value)"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-600">Data final</label>
        <input
          :value="selectedEndDateUi"
          type="date"
          class="h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
          @input="emit('update:selectedEndDateUi', $event.target.value)"
        />
      </div>

      <div class="flex items-end">
        <button
          type="button"
          class="h-10 w-full md:w-auto px-5 rounded-lg bg-rose-900 text-white font-medium hover:bg-rose-950 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          :disabled="isRefreshing"
          @click="emit('refresh')"
        >
          {{ isRefreshing ? 'Atualizando...' : 'Atualizar' }}
        </button>
      </div>
    </div>
  </section>
</template>
