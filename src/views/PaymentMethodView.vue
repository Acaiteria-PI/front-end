<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Banknote, ChevronLeft, CreditCard, Smartphone, Info } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order.js'
import PaymentMethod from '@/components/Orders/PaymentMethod.vue'

const orderStore = useOrderStore()
const route = useRoute()
const router = useRouter()

const routeId = route.params.orderId

const order = computed(() => {
  return orderStore.orders.find(order => order.id === Number(routeId))
})

const totalValue = computed(() => {
  if (!order.value?.total_amount) {
    console.log(order.value)
    return 0
  }
  return order.value.total_amount
})

const selectedMethod = ref(null)
const received = ref(null)

const paymentMethods = ref([
  {
    id: 'dinheiro',
    name: 'Dinheiro',
    description: 'Pagamento em espécie',
    icon: Banknote
  },
  {
    id: 'cartao',
    name: 'Cartão',
    description: 'Crédito ou débito',
    icon: CreditCard
  },
  {
    id: 'pix',
    name: 'PIX',
    description: 'Transferência instantânea',
    icon: Smartphone
  }
])

const change = computed(() => {
  if (!received.value) return 0
  return parseFloat(received.value) - parseFloat(totalValue.value)
})

const selectMethod = (methodId) => {
  selectedMethod.value = methodId
}
</script>

<template>
  <div class="min-h-[calc(100vh-6rem)] max-w-7xl mx-auto p-6 grid grid-cols-2 gap-8">
    <!-- Header -->
    <div class="col-span-1">
      <div class="mb-6">
        <button @click="router.back()" class="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft :size="20" />
          <span class="ml-1">Voltar</span>
        </button>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Registrar método de pagamento
        </h1>
        <p class="text-gray-600">
          Selecione como o cliente irá pagar
        </p>
      </div>

      <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div class="flex gap-3">
          <Info :size="20" class="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-blue-900 mb-2">Para que serve esta etapa?</p>
            <ol class="text-sm text-blue-800 space-y-1">
              <li>- Controle financeiro</li>
              <li>- Comprovante de método de pagemento</li>
              <li>- Relatórios mais inteligentes: Pagamento registrado no faturamento</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Resumo do Pedido -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-500 mb-1">Pedido de</p>
            <p class="text-lg font-semibold text-gray-800">{{ order.customer }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500 mb-1">Valor total</p>
            <p class="text-3xl font-bold text-blue-600">R$ {{ order.total_amount.replace('.', ',')
            }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1">
      <!-- Métodos de Pagamento -->
      <div class="space-y-4 mb-6">
        <PaymentMethod v-for="method in paymentMethods" :key="method.id" :method="method"
          :selected-method="selectedMethod" v-model:received="received" @update:selected-method="selectMethod" />
      </div>

      <!-- Campo de Troco (apenas para Dinheiro) -->
      <div v-if="selectedMethod === 'dinheiro'" class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Valor recebido
          (opcional)</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
          <input type="number" v-model="received" step="0.01" placeholder="0,00"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
        </div>
        <div class="mt-4 p-4 bg-green-50 rounded-lg">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Troco:</span>
            <span class="text-xl font-bold text-green-600">R$ {{ change.toFixed(2).replace('.', ',') }}</span>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex gap-4">
        <button @click="router.back()"
          class="cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
          Cancelar
        </button>
        <button @click="confirmPayment" :disabled="!selectedMethod" :class="[
          'cursor-pointer flex-1 px-6 py-3 rounded-lg font-medium transition',
          (selectedMethod)
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        ]">
          Registrar pagamento
        </button>
      </div>
    </div>
  </div>
</template>
