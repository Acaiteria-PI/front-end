<script setup>
import { Trash, PencilLine } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-300 p-4 flex gap-4 relative">
    <div class="flex flex-col items-center gap-2">
      <div class="w-28 h-36 bg-amber-100 rounded-xl flex items-center justify-center">
        <img
          src="/src/assets/img/1c427fd528b0073b27c4d96dc94845ebd4f1be19.png"
          alt="Produto"
          class="w-20 h-28 object-contain"
        />
      </div>
      <div class="flex items-center justify-start w-full pl-2 gap-2">
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        <span class="text-sm font-medium">Ativo</span>
      </div>
    </div>

    <div class="flex flex-col justify-between flex-grow">
      <div>
        <h2 class="text-lg font-semibold mb-2">Açaí 400ml + Açaí 300ml</h2>
        <p class="text-gray-600 text-sm mb-1">400ml, 300ml</p>
        <p class="text-lg font-medium mb-1">R$30,00</p>
        <p class="text-gray-600 text-md">Açaí</p>
      </div>

      <div class="flex gap-3 justify-end">
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <PencilLine :size="20" />
        </div>
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <Trash :size="20" />
        </div>
      </div>
    </div>
  </div>
</template>
