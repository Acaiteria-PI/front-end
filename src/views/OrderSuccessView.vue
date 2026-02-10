<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order.js'
import { useOrderItemStore } from '@/stores/orderItem.js'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const orderItemStore = useOrderItemStore()

const routeId = Number(route.params.orderId)

const order = computed(() => {
  return orderStore.orders.find((item) => item.id === routeId)
})

const orderItems = computed(() => {
  if (!order.value) return []
  return orderStore.getOrderItems(order.value)
})

const getItemName = (item) => {
  if (item.final_cup_data?.name) return item.final_cup_data.name
  if (item.custom_cup_data?.name) return item.custom_cup_data.name
  if (item.combo_data?.name) return item.combo_data.name
  const cupId = item.final_cup || item.custom_cup || item.combo
  const cup = orderItemStore.getCupById(cupId, item.type)
  return cup?.name || item.type || 'Item'
}

const formatMethod = (method) => {
  if (method === 'CASH') return 'Dinheiro'
  if (method === 'CARD') return 'Cartão'
  if (method === 'PIX') return 'Pix'
  return method || 'N/A'
}

onMounted(async () => {
  if (!order.value || orderItemStore.orderItems.length === 0) {
    await orderStore.fetchOrders()
  }
})
</script>

<template>
  <main class="w-full p-8 mb-20 md:mb-0">
    <section
      class="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl p-5 md:p-7 shadow-sm"
    >
      <div class="flex flex-col items-center text-center gap-4">
        <div class="checkmark-wrap">
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path class="checkmark-check" fill="none" d="M14 27l7 7 17-17" />
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Pedido concluído!</h1>
        <p class="text-gray-600">Pagamento registrado com sucesso.</p>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-500">Pedido</p>
          <p class="text-lg font-semibold">#{{ order?.id || '—' }}</p>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-500">Cliente</p>
          <p class="text-lg font-semibold">{{ order?.customer || '—' }}</p>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-500">Forma de pagamento</p>
          <p class="text-lg font-semibold">{{ formatMethod(order?.payment_method) }}</p>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-500">Data do pedido</p>
          <p class="text-lg font-semibold">
            {{ order?.order_date ? new Date(order.order_date).toLocaleString('pt-BR') : '—' }}
          </p>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-500">Total pago</p>
          <p class="text-lg font-semibold text-green-700">
            R$ {{ order?.total_amount ? order.total_amount.replace('.', ',') : '0,00' }}
          </p>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-semibold mb-3">Itens do pedido</h2>
        <div v-if="orderItems.length > 0" class="space-y-3">
          <div
            v-for="item in orderItems"
            :key="item.id"
            class="flex items-center justify-between p-4 rounded-xl border border-gray-100"
          >
            <div>
              <p class="font-medium text-gray-900">{{ getItemName(item) }}</p>
              <p class="text-sm text-gray-500">Quantidade: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Total</p>
              <p class="font-semibold text-gray-900">
                R$ {{ item.total_price ? item.total_price.replace('.', ',') : '0,00' }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-600">
          Nenhum item encontrado para este pedido.
        </div>
      </div>

      <div class="mt-10 flex flex-col justify-end md:flex-row gap-4">
        <button
          class="w-full cursor-pointer md:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          @click="router.push('/orders')"
        >
          Ver pedidos
        </button>
        <button
          class="w-full cursor-pointer md:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
          @click="router.push('/orders/create')"
        >
          Novo pedido
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.checkmark-wrap {
  width: 100px;
  height: 100px;
  place-items: center;
}

.checkmark {
  width: 90px;
  stroke-width: 4;
  stroke: #16a34a;
  fill: none;
  overflow: visible;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: draw-circle 1s ease-in-out forwards;
}

.checkmark-check {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw-check 1s ease-in-out forwards;
}

@keyframes draw-circle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
