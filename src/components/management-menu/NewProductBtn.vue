<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const open = ref(false)

function select(option) {
  console.log('Selecionado:', option)
  open.value = false
}
</script>

<template>
  <div class="relative inline-text-left w-40">
    <button
      @click="open = !open"
      class="w-full inline-flex items-center justify-between h-14 px-4 py-2 border border-neutral-400 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 cursor-pointer"
      :class="{ 'border-b-0 rounded-b-none': open }"
    >
      Novo produto
      <ChevronDown :size="16" />
    </button>

    <div
      v-if="open"
      class="absolute w-full rounded-xl shadow-md bg-white border border-neutral-400 z-10"
      :class="{ 'rounded-t-none': open }"
    >
      <div class="divide-y divide-gray-300">
        <button
          class="w-full text-left px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
          @click="select('Ingrediente')"
        >
          Ingrediente
        </button>
        <button
          class="w-full text-left px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-b-xl cursor-pointer"
          @click="select('Recipiente')"
        >
          Recipiente
        </button>
      </div>
    </div>
  </div>
</template>
