<script setup>
import { useOrderStore } from '@/stores/order.js'
const orderStore = useOrderStore()

const getStatusClass = (status) => {
  const classes = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELED: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Pedidos Recentes</h3>

    <div class="space-y-2">
      <div
        v-for="order in orderStore.orders"
        :key="order.id"
        class="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
      >
        <div class="flex items-center gap-6 flex-1">
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm">
            #{{ order.id }}
          </span>

          <span class="text-gray-700 font-bold group-hover:text-gray-900">
            {{ order.customer }}
          </span>
          <span
            :class="getStatusClass(order.status)"
            class="px-3 py-1 rounded-full text-xs font-semibold"
          >{{ order.status }}</span>
          <span class="text-gray-700 font-medium group-hover:text-gray-900">
            {{ formatDate(order.order_date) }}
          </span>
        </div>

        <span class="text-lg font-bold text-gray-900">
          R${{ order.total_amount.replace('.', ',') }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
