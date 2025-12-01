<script setup>
import {User} from "lucide-vue-next";
import {useOrderStore} from "@/stores/order.js";

const orderStore = useOrderStore();
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <User :size="20" class="mr-2 text-blue-600"/>
      Dados do Pedido
    </h2>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Cliente
      </label>
      <input
        type="text"
        v-model="orderStore.newOrder.customer"
        placeholder="Nome do cliente"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
