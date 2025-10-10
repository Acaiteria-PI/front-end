<script setup>
const orders = [
  {
    id: 7,
    name: 'Pedido normal',
    price: '12.90',
    status: 'pending'
  },
  {
    id: 6,
    name: 'Combo',
    price: '27.90',
    status: 'pending'
  },
  {
    id: 5,
    name: 'Combo',
    price: '36.90',
    status: 'canceled'
  },
  {
    id: 4,
    name: 'Pedido normal',
    price: '19.90',
    status: 'delivered'
  },
  {
    id: 3,
    name: 'Pedido normal',
    price: '17.90',
    status: 'delivered'
  }
]
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <h3 class="text-xl font-bold text-gray-900 mb-4">Pedidos Recentes</h3>

    <div class="space-y-2">
      <div
        v-for="order in orders"
        :key="order.id"
        class="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
      >
        <div class="flex items-center gap-4 flex-1">
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm">
            #{{ order.id }}
          </span>

          <span class="text-gray-700 font-medium group-hover:text-gray-900">
            {{ order.name }}
          </span>
        </div>

        <span class="text-lg font-bold text-gray-900">
          R${{ order.price }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
