<script setup>
import { computed } from 'vue'
import { BanknoteArrowUp, ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  todayRevenue: {
    type: Number,
    default: 0,
  },
  todayOrdersCount: {
    type: Number,
    default: 0,
  },
  totalSelectedPeriod: {
    type: Number,
    default: 0,
  },
  totalSelectedPeriodOrdersCount: {
    type: Number,
    default: 0,
  },
})

const brlCurrency = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
})

const todayRevenueFormatted = computed(() => brlCurrency.value.format(props.todayRevenue))
const totalPeriodRevenueFormatted = computed(() => brlCurrency.value.format(props.totalSelectedPeriod))
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
    <article class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Faturamento de Hoje</p>
        <div class="bg-emerald-50 p-2 rounded-lg">
          <BanknoteArrowUp class="text-emerald-700" :size="20" />
        </div>
      </div>
      <p class="text-3xl font-bold text-gray-900 mt-3">{{ todayRevenueFormatted }}</p>
      <p class="text-sm text-gray-500 mt-1">{{ todayOrdersCount }} pedido(s) hoje</p>
    </article>

    <article class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Total do Periodo Selecionado</p>
        <div class="bg-sky-50 p-2 rounded-lg">
          <ShoppingBag class="text-sky-700" :size="20" />
        </div>
      </div>
      <p class="text-3xl font-bold text-gray-900 mt-3">{{ totalPeriodRevenueFormatted }}</p>
      <p class="text-sm text-gray-500 mt-1">{{ totalSelectedPeriodOrdersCount }} pedido(s) no periodo</p>
    </article>
  </section>
</template>
