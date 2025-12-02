<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import CustomCupForm from '@/components/Orders/custom-cup/CustomCupForm.vue'
import OrderForm from '@/components/Orders/OrderForm.vue'
import { useCustomCupStore } from '@/stores/customCup.js'
import { useOrderStore } from '@/stores/order.js'
import { useOrderItemStore } from '@/stores/orderItem.js'
import OrderSummary from '@/components/Orders/custom-cup/CustomCupOrderSummary.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const orderItemStore = useOrderItemStore()
const orderStore = useOrderStore()
const customCupStore = useCustomCupStore()

const route = useRoute()
const router = useRouter()

const routeId = route.params.orderId

const goBack = () => {
  router.push('/orders/create')
}

const handleSubmit = async () => { //COMENTÁRIOS FEITOS PRA AJUDAR NA COMPREENSÃO (NÃO É CHATGPT)
  await customCupStore.createCustomCup(customCupStore.newCustomCup) // Cria o copo pela função da store
  const createdCustomCup = customCupStore.customCups[customCupStore.customCups.length - 1] // Armazena o copo criado (o último do array)

  if (!routeId) {
    const orderData = {
      status: 'PENDING',
      customer: orderStore.newOrder.customer
    }
    await orderStore.createOrder(orderData)
    const createdOrder = orderStore.orders[0]

    const orderItemData = {
      type: 'CUSTOM_CUP',
      custom_cup: createdCustomCup.id,
      order: createdOrder.id,
      quantity: 1,
      unit_price: createdCustomCup.price
    }
    await orderItemStore.createOrderItem(orderItemData)
  } else {
    const orderItemData = {
      type: 'CUSTOM_CUP',
      custom_cup: createdCustomCup.id,
      order: routeId,
      quantity: 1,
      unit_price: createdCustomCup.price
    }
    await orderItemStore.createOrderItem(orderItemData)
  }

  await router.push('/orders')
  await orderStore.fetchOrders()
}

</script>

<template>
  <div class="min-h-combo bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <button @click="goBack"
                class="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft :size="24" />
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
        <!-- custo cup -->
        <CustomCupForm />

        <!-- order -->
        <OrderForm v-if="!routeId" />

        <!-- order item data -->
        <OrderSummary />

        <!-- action buttons -->
        <div class="grid grid-cols-5 gap-4 mt-6 flex">
          <button
            @click="goBack"
            class="cursor-pointer col-span-2 flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <SubmitButton class="col-span-3" @click="handleSubmit" btn-name="Confirmar item" />
        </div>
      </div>
    </div>
  </div>
</template>
