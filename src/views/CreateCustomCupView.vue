<script setup>
import {ChevronLeft} from 'lucide-vue-next';
import {useRouter} from 'vue-router';
import CustomCupForm from "@/components/Orders/CustomCupForm.vue";
import OrderForm from "@/components/Orders/OrderForm.vue";
import {useCustomCupStore} from "@/stores/customCup.js";
import {useOrderStore} from "@/stores/order.js";
import {useOrderItemStore} from "@/stores/orderItem.js";
import OrderSummary from "@/components/Orders/OrderSummary.vue";
import SubmitButton from "@/components/SubmitButton.vue";

const orderItemStore = useOrderItemStore();
const orderStore = useOrderStore();
const customCupStore = useCustomCupStore();

const router = useRouter()

const goBack = () => {
  router.push('/orders/create');
};

const handleSubmit = async () => { //COMENTÁRIOS FEITOS PRA AJUDAR NA COMPREENSÃO (NÃO É CHATGPT)
  await customCupStore.createCustomCup(customCupStore.newCustomCup) // Cria o copo pela função da store
  const createdCustomCup = customCupStore.customCups[customCupStore.customCups.length -1]; // Armazena o copo criado (o último do array)

  const orderData = {
    status: 'PENDING',
    customer: orderStore.newOrder.customer,
    item_type: 'custom_cup',
    responsible_person: 1,
  };
  await orderStore.createOrder(orderData);
  const createdOrder = orderStore.orders[orderStore.orders.length -1]
  console.log(createdOrder)

  const orderItemData = {
    type: 'CUSTOM_CUP',
    custom_cup: createdCustomCup.id,
    order: createdOrder.id,
    quantity: 1,
    unit_price: createdCustomCup.price,
  };
  await orderItemStore.createOrderItem(orderItemData)

  router.push('/orders')
};

</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <button @click="goBack" class="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft :size="20"/>
          <span class="ml-1">Voltar</span>
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Copo Customizado
        </h1>
        <p class="text-gray-600">
          Preencha as informações do pedido
        </p>
      </div>

      <div class="space-y-6">
        <!-- custom_cup -->
        <CustomCupForm/>

        <!-- order -->
        <OrderForm/>

        <!-- Dados do Item -->
        <OrderSummary/>

        <!-- Botões de Ação -->
        <div class="grid grid-cols-5 gap-4 mt-6 flex">
          <button
            @click="goBack"
            class="cursor-pointer col-span-2 flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <SubmitButton class="col-span-3" @click="handleSubmit" btn-name="Confirmar pedido" />
        </div>
      </div>
    </div>
  </div>
</template>
