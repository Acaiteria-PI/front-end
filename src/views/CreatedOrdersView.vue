<script setup>
import { useRouter } from 'vue-router'
import CreatedOrderItem from '@/components/Orders/CreatedOrderItem.vue'
import { useOrderStore } from '@/stores/order.js'
import { Clock, Package, ShoppingBag, User, UserCheck } from 'lucide-vue-next'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'

const loadingStore = useLoading()

const router = useRouter()
const orderStore = useOrderStore()

const getStatusClass = (status) => {
  const classes = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELED: 'bg-red-100 text-red-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getPaymentStatus = (status) => {
  if (status == false) return 'Não pago'
  else return 'Pago'
}

const handleAddOrderItem = (orderId) => {
  router.push({ name: 'create-order',
    params: {
      orderId: orderId
    }
  })
}
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Pedidos</h1>
        <p class="text-gray-600">Gerencie todos os pedidos da loja</p>
      </div>

      <!-- Lista de Pedidos -->
      <div class="space-y-4">
        <div
          v-for="order in orderStore.orders"
          :key="order.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Header do Pedido -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <span
                    :class="getStatusClass(order.status)"
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ order.status }}
                  </span>
                  <span class="text-sm text-gray-500"> Pedido #{{ order.id }} </span>
                  <span class="bg-gray-300 px-3 py-1 rounded-full text-sm font-medium"> Pedido {{ getPaymentStatus(order.is_paid) }} </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div class="flex items-center gap-2">
                    <User :size="16" class="text-gray-400" />
                    <div>
                      <p class="text-xs text-gray-500">Cliente</p>
                      <p class="text-sm font-medium text-gray-800">{{ order.customer }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <Clock :size="16" class="text-gray-400" />
                    <div>
                      <p class="text-xs text-gray-500">Data e hora</p>
                      <p class="text-sm font-medium text-gray-800">{{ formatDate(order.order_date) }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <UserCheck :size="16" class="text-gray-400" />
                    <div>
                      <p class="text-xs text-gray-500">Responsável</p>
                      <p class="text-sm font-medium text-gray-800">
                        {{ order.responsible_person_data.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <p class="text-xs text-gray-500 mb-1">Valor total</p>
                <p class="text-2xl font-bold text-purple-600">
                  R$ {{ order.total_amount.replace('.', ',') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Itens do Pedido -->
          <div class="p-6 bg-gray-50">
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <ShoppingBag :size="16" />
              Itens do pedido
            </h3>

            <div class="space-y-3">
              <CreatedOrderItem
                v-for="orderItem in orderStore.getOrderItems(order)"
                :key="orderItem.id"
                :order="order"
                :order-item="orderItem"
              />
            </div>
          </div>

          <!-- Footer do Pedido (Ações) -->
          <div class="px-6 py-4 bg-white border-t border-gray-100">
            <div class="flex gap-3 justify-end">
              <button
              @click="handleAddOrderItem(order.id)"
                class="cursor-pointer px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Adicionar item
              </button>
              <button
                class="cursor-pointer px-4 py-2 text-sm text-white bg-rose-900 rounded-lg hover:bg-rose-950 transition"
              >
                Finalizar pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="orderStore.orders.length === 0"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
      >
        <Package :size="48" class="mx-auto text-gray-300 mb-4" />
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nenhum pedido encontrado</h3>
        <p class="text-gray-600">Os pedidos aparecerão aqui quando forem criados</p>
      </div>
    </div>
  </div>
</template>
