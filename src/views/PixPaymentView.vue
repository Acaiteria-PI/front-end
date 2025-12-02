<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'
import { useOrderStore } from '@/stores/order.js'
import { generateQRCodeDataURL } from '@/services/pixService.js'
import { Info } from 'lucide-vue-next';

const orderStore = useOrderStore()
const router = useRouter()
const route = useRoute()
const qrCode = ref(null)
const routeId = route.params.orderId

const order = computed(() => {
  return orderStore.orders.find(order => order.id == routeId)
})

const showPixQR = async (orderPlain) => {
  qrCode.value = await generateQRCodeDataURL(orderPlain, QRCode)
}

const confirmPayment = () => {
  order.value.status = 'IN_PROGRESS'
  order.value.is_paid = true
  orderStore.updateOrder(order.value)
  router.push('/orders')
}

watch(
  () => order.value,
  (val) => {
    if (val) {
      console.log('Order carregado:', val)
      showPixQR(val)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <div class="max-w-md w-full">
      <!-- Card Principal -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <!-- Header -->
        <div class="text-center mb-6">
          <div
            class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
            <img src="@/assets/img/logo.png" alt="">
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            Pagamento via PIX
          </h1>
          <p class="text-gray-600">
            Escaneie o QR Code para pagar
          </p>
        </div>

        <!-- Valor -->
        <div class="bg-gray-50 rounded-xl p-4 mb-6 text-center">
          <p class="text-sm text-gray-600 mb-1">Valor a pagar</p>
          <p class="text-4xl font-bold text-green-600">R$ {{ order.total_amount.replace('.', ',') }}</p>
        </div>

        <!-- QR Code -->
        <div
          class="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 flex items-center justify-center">
          <div class="text-center">
            <div class="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
              <p v-if="!qrCode" class="text-xs text-gray-500">Gerando QR Code...</p>
              <div v-if="qrCode">
                <img :src="qrCode" alt="PIX QR Code" />
              </div>
            </div>
            <p class="text-xs text-gray-500">Aguardando confirmação...</p>
          </div>
        </div>

        <!-- Instruções -->
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <div class="flex gap-3">
            <Info :size="20" class="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-blue-900 mb-2">Como pagar:</p>
              <ol class="text-sm text-blue-800 space-y-1">
                <li>1. Abra o app do seu banco</li>
                <li>2. Escaneie o QR Code ou cole o código</li>
                <li>3. Confirme o pagamento</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Status de Pagamento -->
        <div class="flex items-center justify-center gap-2 mb-6">
          <p class="text-md text-gray-600">Powered by</p>
          <img src="@/assets/img/abacate-pay.svg" alt="">
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-3">
          <button
            @click="router.back()"
            class="cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            @click="confirmPayment"
            class="cursor-pointer flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
