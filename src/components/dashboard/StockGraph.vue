<script setup>
import { ref, onMounted } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useStockStore } from '@/stores/stock.js'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'
import { lowStockThresholdGrams, mediumStockThresholdGrams } from '@/constants/lowStockTreshold.js'

Chart.register(...registerables)

const stockStore = useStockStore()
const loadingStore = useLoading()

const chartData = ref({
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Qtd em estoque (g)',
        data: [],
        backgroundColor: '',
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  },
})
const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
}

onMounted(async () => {
  try {
    if (stockStore.lowStockItems.length === 0) {
      loadingStore.isLoading = true
      await stockStore.fetchLowStock()
    }

    const labels = []
    const data = []
    const colors = []

    for (const item of stockStore.lowStockItems) {
      labels.push(
        `${item.ingredient_data.name} (${item.ingredient_data.unit_of_measure}) - Lote ${item.batch}`,
      )

      data.push(item.quantity)

      if (item.quantity < lowStockThresholdGrams) colors.push('#ef4444')
      else if (item.quantity < mediumStockThresholdGrams && item.quantity >= lowStockThresholdGrams)
        colors.push('#f59e0b')
      else colors.push('#10b981')

      chartData.value.data.labels = labels
      chartData.value.data.datasets[0].data = data
      chartData.value.data.datasets[0].backgroundColor = colors
    }
  } catch (error) {
    console.error('Error fetching low stock items:', error)
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <div>
      <p class="font-bold text-xl mb-3">Estoque Baixo</p>
      <BarChart :chartData="chartData.data" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped></style>
