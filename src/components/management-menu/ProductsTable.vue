<script setup>
import { PencilLine, Trash } from 'lucide-vue-next'

defineProps(['headers', 'products'])
</script>

<template>
  <table class="border border-neutral-300 rounded-xl border-separate border-spacing-0 table-fixed w-full">
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
        <td class="p-2 border-t border-neutral-300">{{ product.ingredient }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.quantity }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.batch }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.supplier }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.unit_of_measure }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.batch_price }}</td>
        <td class="p-2 border-t border-neutral-300">{{ product.expiration_date }}</td>
        <td class="p-2 border-t border-neutral-300">
          <div class="flex flex-row items-center justify-start gap-2">
            <PencilLine class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all" />
            <Trash class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
