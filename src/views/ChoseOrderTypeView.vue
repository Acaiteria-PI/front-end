<script setup>
import {Sparkles, Tag, Gift} from 'lucide-vue-next'
import OrderTypeCard from "@/components/Orders/OrderTypeCard.vue";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
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
        <OrderTypeCard @click="router.push('/orders/create/custom-cup')" title="Copo customizado" :icon="Sparkles" icon-color="#9333ea"
                       description="Monte o açaí do seu jeito com frutas e complementos à escolha"/>
        <OrderTypeCard @click="router.push('/orders/create/final-cup')" title="Copo pronto" :icon="Tag" icon-color="#3b82f6"
                       description="Escolha entre nossas combinações já montadas e aprovadas"/>
        <OrderTypeCard @click="router.push('/orders/create/combo')" title="Combo" :icon="Gift" icon-color="#f97316"
                       description="Pacotes especiais com açaí e acompanhamentos em promoção"/>

      </div>
    </div>
  </div>
</template>

