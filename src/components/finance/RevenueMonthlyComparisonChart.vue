<script setup>
import { computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { BarChart } from 'vue-chart-3'

Chart.register(...registerables)

defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `Total: ${brlFormatter.format(context.parsed.y || 0)}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback(value) {
            return brlFormatter.format(Number(value))
          },
        },
      },
    },
  }
})
</script>

<template>
  <article class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-3">Comparativo Mensal</h2>
    <div class="h-72 md:h-80 overflow-x-auto">
      <BarChart :chartData="chartData" :options="chartOptions" />
    </div>
  </article>
</template>
