<script setup>
const orders = [
  {
    id: 7,
    name: 'Pedido normal',
    price: '12.90',
    status: 'pending',
  },
  {
    id: 6,
    name: 'Combo',
    price: '27.90',
    status: 'pending',
  },
  {
    id: 5,
    name: 'Combo',
    price: '36.90',
    status: 'canceled',
  },
  {
    id: 4,
    name: 'Pedido normal',
    price: '19.90',
    status: 'delivered',
  },
  {
    id: 3,
    name: 'Pedido normal',
    price: '17.90',
    status: 'delivered',
  },
]
</script>

<template>
  <div class="flex flex-col">
    <p class="text-xl mb-3 font-medium">Pedidos Recentes</p>
    <div class="w-90 h-80 flex flex-col justify-center items-center rounded-2xl gap-2 shadow-md">
      <div class="w-80 h-12 rounded-xl flex items-center bg-blue-100 shadow-xs" v-for="order in orders" :key="order.id">
        <div class="font-bold ml-4">#{{ order.id }}</div>
        <div class="ml-4 w-30">{{ order.name }}</div>
        <div class="ml-8 justify-self-end">R${{ order.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
