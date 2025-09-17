<script setup>
import { useStockStore } from '@/stores/stock.js'

const stockStore = useStockStore()
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    class="w-66 h-42 bg-white rounded-ld flex flex-col items-center justify-center shadow-xl p-6 gap-4 rounded-2xl"
  >
    <section class="w-full flex flex-col justify-center items-center">
      <h1 class="text-lg font-bold">Tem certeza?</h1>
      <p class="text-sm text-neutral-500 text-center">Essa ação é irreversível.</p>
    </section>
    <div class="options w-full flex flex-row justify-between">
      <button
        @click="emit('cancel')"
        class="w-24 h-10 text-sm bg-neutral-300 rounded-xl hover:bg-neutral-400 transition-all cursor-pointer"
      >
        Cancelar
      </button>
      <button
        @click="emit('confirm')"
        class="w-24 h-10 text-sm bg-red-800 text-white rounded-xl hover:bg-red-900 transition-all cursor-pointer"
      >
        Sim, excluir
      </button>
    </div>
  </div>
</template>

<style scoped></style>
