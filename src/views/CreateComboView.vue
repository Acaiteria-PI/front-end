<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronLeft, Coffee } from 'lucide-vue-next'
import ComboSelectionCard from '@/components/Orders/combo/ComboSelectionCard.vue'
import ComboOrderSummary from '@/components/Orders/combo/ComboOrderSummary.vue'
import OrderForm from '@/components/Orders/OrderForm.vue'
import { useOrderStore } from '@/stores/order.js'
import { useOrderItemStore } from '@/stores/orderItem.js'
import { useComboStore } from '@/stores/combo.js'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'


const loadingStore = useLoading()
const route = useRoute()
const router = useRouter()
const selectedCombo = ref(null)
const comboStore = useComboStore()
const orderStore = useOrderStore()
const orderItemStore = useOrderItemStore()

const routeId = route.params.orderId

const handleSelectCombo = (comboId) => {
  selectedCombo.value = comboId
}

const handleSubmit = async () => {
  if (!routeId) {
  const orderData = {
    status: 'PENDING',
    customer: orderStore.newOrder.customer,
  }
  await orderStore.createOrder(orderData)
  const createdOrder = orderStore.orders[orderStore.orders.length - 1]

  const orderItemData = {
    type: 'COMBO',
    combo: selectedCombo.value,
    order: createdOrder.id,
    quantity: 1,
    unit_price: comboStore.combos.find(combo => combo.id === selectedCombo.value).price,
  };
  await orderItemStore.createOrderItem(orderItemData)
  } else {
    const orderItemData = {
      type: 'COMBO',
      combo: selectedCombo.value,
      order: routeId,
      quantity: 1,
      unit_price: comboStore.combos.find(combo => combo.id === selectedCombo.value).price,
    }
    await orderItemStore.createOrderItem(orderItemData)
  }

  await router.push('/orders')
  await orderStore.fetchOrders()
}

onMounted(async () => {
  if (comboStore.combos.length > 0) return
  try {
    loadingStore.isLoading = true
    await comboStore.fetchCombos()
  } catch (error) {
    console.error('Error fetching combos:', error)
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <!-- header -->
  <div class="min-h-full bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="mb-6">
        <button
          @click="router.back()"
          class="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ChevronLeft :size="24" />
          <span class="ml-1">Voltar</span>
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Combo</h1>
        <p class="text-gray-600">Selecione um dos nossos combos</p>
      </div>

      <!-- order data -->
      <OrderForm v-if="!routeId" />

      <!-- final cups grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComboSelectionCard
          v-for="combo in comboStore.combos"
          :key="combo.id"
          :combo="combo"
          :selectedCombo="selectedCombo"
          @click="handleSelectCombo(combo.id)"
        />
      </div>

      <!-- order item data -->
      <ComboOrderSummary :selected-combo="selectedCombo" />

      <!-- if there is no final cup -->
      <div
        v-if="comboStore.combos.length === 0"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
      >
        <Coffee :size="48" class="mx-auto text-gray-300 mb-4" />
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nenhum copo pronto disponível</h3>
        <p class="text-gray-600">Cadastre copos prontos para aparecerem aqui</p>
      </div>

      <!-- action buttons -->
      <div v-if="comboStore.combos.length > 0" class="grid grid-cols-5 gap-4 mt-6 flex">
        <button
          @click="router.back()"
          class="cursor-pointer col-span-2 flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
        <button
          @click="handleSubmit"
          :disabled="!selectedCombo"
          :class="[
            'w-full h-15 rounded-xl font-medium text-white duration-200 ease-in-out col-span-3',
            selectedCombo
              ? 'bg-rose-900 text-white hover:bg-rose-950 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  </div>
</template>
