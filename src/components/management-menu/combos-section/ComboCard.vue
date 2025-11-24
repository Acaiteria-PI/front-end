<script setup>
import { PencilLine, Trash } from 'lucide-vue-next'
import { useComboStore } from '@/stores/combo.js'
import { useModalStore } from '@/stores/modal.js'

defineProps(['product'])

const comboStore = useComboStore()
const modalStore = useModalStore()
</script>

<template>
  <div class="bg-white md:min-w-md rounded-xl border border-gray-300 p-4 flex flex-col">
    <div class="flex items-start justify-between mb-1">
      <h2 class="text-lg font-semibold">{{ product.name }}</h2>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        <span class="text-sm font-medium">Ativo</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span class="font-medium text-gray-900 text-base">R${{ product.price.replace('.', ',') }}</span>
        <span>{{ comboStore.getFinalCupsNames(product) }}</span>
      </div>

      <div class="flex gap-3">
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <PencilLine :size="20" @click="modalStore.openCreateModal('edit', product)" />
        </div>
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <Trash :size="20" @click="modalStore.openConfirmDeleteModal(product.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
