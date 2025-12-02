<script setup>
import {Sparkles, Tag, Gift} from 'lucide-vue-next'
import OrderTypeCard from "@/components/Orders/OrderTypeCard.vue";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const orderId = route.params.orderId

const handleRoute = (routeName, id) => {
  router.push({
    name: routeName,
    params: {
      orderId: id
    }
  })
}
</script>

<template>
  <div class="min-h-[calc(100vh-6rem)] bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Novo Pedido
        </h1>
        <p class="text-gray-600">
          Selecione o tipo de pedido
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OrderTypeCard @click="handleRoute('create-custom-cup', orderId)" title="Copo customizado" :icon="Sparkles" icon-color="#9333ea"
                       description="Monte o açaí do seu jeito com frutas e complementos à escolha"/>
        <OrderTypeCard @click="handleRoute('create-final-cup', orderId)" title="Copo pronto" :icon="Tag" icon-color="#3b82f6"
                       description="Escolha entre nossas combinações já montadas e aprovadas"/>
        <OrderTypeCard @click="handleRoute('create-combo', orderId)" title="Combo" :icon="Gift" icon-color="#f97316"
                       description="Pacotes especiais com açaí e acompanhamentos em promoção"/>

      </div>
    </div>
  </div>
</template>

