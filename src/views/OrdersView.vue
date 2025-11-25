<script setup>
import ProductsTable from "@/components/management-menu/ProductsTable.vue";
import {onMounted} from "vue";
import {useOrderStore} from "@/stores/order.js";

const orderStore = useOrderStore();

const headers = [
  {name: 'Status', value: 'status'},
  {name: 'Cliente', value: 'customer'},
  {name: 'Data do Pedido', value: 'order_date'},
  {name: 'Responsável', value: 'responsible_person_data'},
  {name: 'Total', value: 'total_amount'},
  {name: 'Pago', value: 'is_paid'}
]

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<template>
  <main class="w-full h-full px-12 py-8">
    <h1 class="text-4xl font-bold">Pedidos</h1>
    <ProductsTable :headers="headers" :products="orderStore.orders" :can-delete="false" />
  </main>
</template>
