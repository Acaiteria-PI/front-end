<script setup>
import { computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'

Chart.register(...registerables)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  selectedMonthUi: {
    type: String,
    default: '',
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
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title(context) {
            const day = context[0]?.label ?? ''
            const [year, month] = props.selectedMonthUi.split('-')
            if (!year || !month) return `Dia ${day}`
            return `${String(day).padStart(2, '0')}/${month}/${year}`
          },
          label(context) {
            return `Faturamento: ${brlFormatter.format(context.parsed.y || 0)}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
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
    <h2 class="text-lg font-semibold text-gray-900 mb-3">Faturamento Diario (Mes Atual)</h2>
    <div class="h-72 md:h-80 overflow-x-auto">
      <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
  </article>
</template>
