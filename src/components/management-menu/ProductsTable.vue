<script setup>
import { PencilLine, Trash } from 'lucide-vue-next'
import { useStockStore } from '@/stores/stock.js'
import { useModalStore } from '@/stores/modal.js'

defineProps(['headers', 'products'])

const stockStore = useStockStore()
const modalStore = useModalStore()

const formatField = (product, value) => {
  if (value === 'ingredient_data') return product.ingredient_data?.name || '-'
  else if (value === 'expiration_date') return new Date(product.expiration_date).toLocaleDateString('pt-BR')
  else if (value === 'price') return `R$ ${product.price.replace('.', ',')}`
  else if (value === 'quantity') return product.quantity.replace('.',',')
  return product[value]
}
</script>

<template>
  <table
    class="border border-neutral-300 rounded-xl border-separate border-spacing-0 table-fixed w-full">
    <thead>
    <tr>
      <th
        v-for="header in headers"
        :key="header.name"
        class="p-2 text-start font-medium text-neutral-500"
      >
        {{ header.name }}
      </th>
      <th class="p-2 text-start text-neutral-500 font-medium">Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.id" class="border-t border-neutral-300">
      <td class="p-2 border-t border-neutral-300" v-for="header in headers" :key="header.value">
        {{ formatField(product, header.value)
        }}
      </td>
      <td class="p-2 border-t border-neutral-300">
        <div class="flex flex-row items-center justify-start gap-2">
          <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
            <PencilLine @click="modalStore.openCreateModal('edit', product)" :size="20" />
          </div>
          <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
            <Trash :size="20" @click="modalStore.openConfirmDeleteModal(product.id)" />
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
