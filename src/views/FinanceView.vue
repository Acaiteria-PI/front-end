<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRevenueStore } from '@/stores/revenue.js'
import RevenueFilters from '@/components/finance/RevenueFilters.vue'
import RevenueMetricCards from '@/components/finance/RevenueMetricCards.vue'
import RevenueDailyChart from '@/components/finance/RevenueDailyChart.vue'
import RevenueMonthlyComparisonChart from '@/components/finance/RevenueMonthlyComparisonChart.vue'

const revenueStore = useRevenueStore()
const isRefreshing = ref(false)

const refreshRevenue = async () => {
  try {
    isRefreshing.value = true
    await revenueStore.fetchDailyRevenue(
      revenueStore.selectedStartDateUi,
      revenueStore.selectedEndDateUi,
    )
  } catch (error) {
    console.error('Error refreshing revenue:', error)
  } finally {
    isRefreshing.value = false
  }
}

const hasNoData = computed(() => {
  return !isRefreshing.value && !revenueStore.hasRevenueData
})

const pad2 = (num) => String(num).padStart(2, '0')

const applyMonthRange = (monthValue) => {
  if (!monthValue) return
  const [yearStr, monthStr] = monthValue.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)
  const lastDay = new Date(year, month, 0).getDate()

  revenueStore.selectedStartDateUi = `${year}-${pad2(month)}-01`
  revenueStore.selectedEndDateUi = `${year}-${pad2(month)}-${pad2(lastDay)}`
}

const handleMonthChange = (monthValue) => {
  revenueStore.selectedMonthUi = monthValue
  applyMonthRange(monthValue)
}

onMounted(async () => {
  if (!revenueStore.selectedStartDateUi || !revenueStore.selectedEndDateUi) {
    applyMonthRange(revenueStore.selectedMonthUi)
  }
  if (revenueStore.revenues.length > 0) return
  await refreshRevenue()
})
</script>

<template>
  <div class="min-h-full bg-gray-50 p-6 md:p-8 mb-20 md:mb-0">
    <header class="mb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Financeiro</h1>
      <p class="text-gray-600 mt-1">Acompanhe faturamento diario e comparativo mensal</p>
    </header>

    <div class="space-y-6">
      <RevenueFilters
        :selectedMonthUi="revenueStore.selectedMonthUi"
        :selectedStartDateUi="revenueStore.selectedStartDateUi"
        :selectedEndDateUi="revenueStore.selectedEndDateUi"
        :isRefreshing="isRefreshing"
        @update:selectedMonthUi="handleMonthChange"
        @update:selectedStartDateUi="revenueStore.selectedStartDateUi = $event"
        @update:selectedEndDateUi="revenueStore.selectedEndDateUi = $event"
        @refresh="refreshRevenue"
      />

      <RevenueMetricCards
        :todayRevenue="revenueStore.todayRevenue"
        :todayOrdersCount="revenueStore.todayOrdersCount"
        :totalSelectedPeriod="revenueStore.totalSelectedPeriod"
        :totalSelectedPeriodOrdersCount="revenueStore.totalSelectedPeriodOrdersCount"
      />

      <div
        v-if="hasNoData"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center"
      >
        <h2 class="text-lg font-semibold text-gray-900">Nenhum faturamento encontrado</h2>
        <p class="text-gray-600 mt-2">
          Nao ha dados para o periodo selecionado. Tente atualizar ou aguarde novos pedidos pagos.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueDailyChart
          :chartData="revenueStore.dailyChartData"
          :selectedMonthUi="revenueStore.selectedMonthUi"
        />
        <RevenueMonthlyComparisonChart :chartData="revenueStore.monthlyComparisonData" />
      </div>
    </div>
  </div>
</template>
