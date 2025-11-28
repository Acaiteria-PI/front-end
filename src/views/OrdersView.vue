<script setup>
import ProductsTable from "@/components/management-menu/ProductsTable.vue";
import {onMounted} from "vue";
import {useOrderStore} from "@/stores/order.js";
import NewProductBtn from "@/components/management-menu/NewProductBtn.vue";
import SectionTitle from "@/components/management-menu/SectionTitle.vue";
import SearchBar from "@/components/management-menu/SearchBar.vue";
import FinalCupCard from "@/components/management-menu/products-section/FinalCupCard.vue";

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
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SectionTitle title="Pedidos"/>
      <div class="flex flex-row gap-4">
        <router-link to="/orders/create">
          <NewProductBtn title="Registrar pedido"/>
        </router-link>
      </div>
    </section>
    <section class="w-full flex flex-wrap gap-6 mt-8">
    </section>
    <ProductsTable :headers="headers" :products="orderStore.orders" :can-delete="false"/>
  </main>
</template>
