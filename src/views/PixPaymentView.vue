<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import { useOrderStore } from '@/stores/order.js'
import { generateQRCodeDataURL } from '@/services/pixService.js'

const orderStore = useOrderStore()
const route = useRoute()
const qrCode = ref(null)
const routeId = route.params.orderId

const order = computed(() => {
  return orderStore.orders.find(order => order.id == routeId)
})

const showPixQR = async (orderPlain) => {
  qrCode.value = await generateQRCodeDataURL(orderPlain, QRCode)
}

watch(
  () => order.value,
  (val) => {
    if (val) {
      console.log("Order carregado:", val)
      showPixQR(val)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="qrCode">
    <img :src="qrCode" alt="PIX QR Code" />
  </div>
</template>
