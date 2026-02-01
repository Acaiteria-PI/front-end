<script setup>
import {PencilLine, Trash} from 'lucide-vue-next'
import {useModalStore} from '@/stores/modal.js'

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  canDelete: {
    type: Boolean,
    required: false,
    default: true
  }
})

const modalStore = useModalStore()

const formatField = (product, value) => {
  if (value === 'ingredient_data') return product.ingredient_data?.name || 'N/A'
  else if (value === 'expiration_date') return new Date(product.expiration_date).toLocaleDateString('pt-BR')
  else if (value === 'order_date') return new Date(product.order_date).toLocaleString("pt-BR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  else if (value === 'price') return `R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}`
  else if (value === 'batch_price') return `R$ ${parseFloat(product.batch_price).toFixed(2).replace('.', ',')}`
  else if (value === 'quantity') return parseFloat(product.quantity).toFixed(2).replace('.', ',')
  else if (value === 'establishment_data') return product.establishment_data?.name || 'N/A'
  else if (value === 'is_management') return product.is_management ? 'Sim' : 'Não'
  else if (value === 'responsible_person_data') return product.responsible_person_data?.name || 'N/A'
  return product[value]
}
</script>

<template>

  <div class="mt-6">


    <div class="md:hidden space-y-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border border-neutral-300 rounded-lg p-4 shadow-sm"
      >
        <div
          v-for="header in headers"
          :key="header.value"
          class="flex justify-between py-1"
        >
          <span class="font-medium text-neutral-600 text-sm">{{ header.name }}</span>
          <span class="text-sm text-neutral-800">
      {{ formatField(product, header.value) }}
    </span>
        </div>

        <div class="flex flex-row items-center gap-3 pt-3">
          <div class="cursor-pointer hover:bg-gray-200 rounded-lg p-1 transition-all">
            <PencilLine @click="modalStore.openCreateModal('edit', product)" :size="20"/>
          </div>
          <div v-if="props.canDelete === true" class="cursor-pointer hover:bg-gray-200 rounded-lg p-1 transition-all">
            <Trash :size="20" @click="modalStore.openConfirmDeleteModal(product.id)"/>
          </div>
        </div>
      </div>

    </div>


    <div class="w-full overflow-x-auto hidden md:block">
      <table
        class="border border-neutral-300 rounded-xl border-separate border-spacing-0 table-fixed w-full min-w-[600px]">
        <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.name"
            class="p-2 text-start font-medium text-neutral-500 break-words whitespace-normal"
          >
            {{ header.name }}
          </th>
          <th class="p-2 text-start text-neutral-500 font-medium break-words whitespace-normal">
            Ações
          </th>
        </tr>
        </thead>


        <tbody>
        <tr v-for="product in products" :key="product.id" class="border-t border-neutral-300">

          <td
            v-for="header in headers"
            :key="header.value"
            class="p-2 border-t border-neutral-300 break-words whitespace-normal"
          >
            {{ formatField(product, header.value) }}
          </td>

          <td class="p-2 border-t border-neutral-300">
            <div class="flex flex-row items-center justify-start gap-2">
              <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
                <PencilLine @click="modalStore.openCreateModal('edit', product)" :size="20"/>
              </div>
              <div v-if="props.canDelete === true" class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
                <Trash :size="20" @click="modalStore.openConfirmDeleteModal(product.id)"/>
              </div>
            </div>
          </td>

        </tr>
        </tbody>
      </table>


    </div>
  </div>

</template>

<style scoped></style>
