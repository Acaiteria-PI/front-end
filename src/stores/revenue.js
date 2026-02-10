import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import DailyRevenueApi from '@/services/dailyRevenueApi.js'

const dailyRevenueApi = new DailyRevenueApi()

const toAmount = (value) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatMonthLabel = (date) => {
  return date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: '2-digit',
  })
}

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

export const useRevenueStore = defineStore('revenue', () => {
  const revenues = ref([])
  const selectedMonthUi = ref(getCurrentMonth())
  const selectedStartDateUi = ref('')
  const selectedEndDateUi = ref('')

  const normalizedRevenues = computed(() => {
    return revenues.value
      .map((revenue) => {
        const parsedDate = new Date(revenue.date)

        return {
          ...revenue,
          parsedDate,
          amount: toAmount(revenue.total_amount),
          ordersCount: Number(revenue.total_orders_count) || 0,
        }
      })
  })

  const todayKey = computed(() => new Date().toISOString().slice(0, 10))

  const todayEntry = computed(() => {
    return normalizedRevenues.value.find((revenue) => revenue.date?.slice(0, 10) === todayKey.value)
  })

  const todayRevenue = computed(() => {
    return todayEntry.value ? todayEntry.value.amount : 0
  })

  const todayOrdersCount = computed(() => {
    return todayEntry.value ? todayEntry.value.ordersCount : 0
  })

  const totalSelectedPeriod = computed(() => {
    return normalizedRevenues.value.reduce(
      (accumulator, revenue) => accumulator + revenue.amount,
      0,
    )
  })

  const totalSelectedPeriodOrdersCount = computed(() => {
    return normalizedRevenues.value.reduce(
      (accumulator, revenue) => accumulator + revenue.ordersCount,
      0,
    )
  })

  const hasRevenueData = computed(() => normalizedRevenues.value.length > 0)

  const dailyChartData = computed(() => {
    const [yearString, monthString] = selectedMonthUi.value.split('-')
    const year = Number.parseInt(yearString, 10)
    const month = Number.parseInt(monthString, 10)

    if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
      return {
        labels: [],
        datasets: [],
      }
    }

    const daysInMonth = new Date(year, month, 0).getDate()
    const labels = Array.from({ length: daysInMonth }, (_, index) => String(index + 1))
    const valuesByDay = Array(daysInMonth).fill(0)

    for (const revenue of normalizedRevenues.value) {
      const revenueYear = revenue.parsedDate.getFullYear()
      const revenueMonth = revenue.parsedDate.getMonth() + 1
      if (revenueYear !== year || revenueMonth !== month) continue

      const revenueDay = revenue.parsedDate.getDate()
      valuesByDay[revenueDay - 1] = revenue.amount
    }

    return {
      labels,
      datasets: [
        {
          label: 'Faturamento diario',
          data: valuesByDay,
          fill: true,
          tension: 0.35,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
        },
      ],
    }
  })

  const monthlyComparisonData = computed(() => {
    const monthlyTotals = new Map()

    for (const revenue of normalizedRevenues.value) {
      const year = revenue.parsedDate.getFullYear()
      const month = revenue.parsedDate.getMonth() + 1
      const monthKey = `${year}-${String(month).padStart(2, '0')}`
      const currentTotal = monthlyTotals.get(monthKey) ?? 0
      monthlyTotals.set(monthKey, currentTotal + revenue.amount)
    }

    const sortedMonthKeys = [...monthlyTotals.keys()].sort()
    const labels = sortedMonthKeys.map((monthKey) => {
      const [yearString, monthString] = monthKey.split('-')
      const monthDate = new Date(
        Number.parseInt(yearString, 10),
        Number.parseInt(monthString, 10) - 1,
        1,
      )
      return formatMonthLabel(monthDate)
    })
    const data = sortedMonthKeys.map((monthKey) => monthlyTotals.get(monthKey))

    return {
      labels,
      datasets: [
        {
          label: 'Faturamento mensal',
          data,
          borderRadius: 8,
          backgroundColor: '#0ea5e9',
        },
      ],
    }
  })

  const fetchDailyRevenue = async (startDate = '', endDate = '') => {
    try {
      const data = await dailyRevenueApi.fetchDailyRevenues({ startDate, endDate })
      revenues.value = Array.isArray(data.results) ? [...data.results] : [...data]
    } catch (error) {
      console.error('Error fetching daily revenues:', error)
    }
  }

  return {
    revenues,
    normalizedRevenues,
    selectedMonthUi,
    selectedStartDateUi,
    selectedEndDateUi,
    todayRevenue,
    todayEntry,
    todayKey,
    todayOrdersCount,
    totalSelectedPeriod,
    totalSelectedPeriodOrdersCount,
    hasRevenueData,
    dailyChartData,
    monthlyComparisonData,
    fetchDailyRevenue,
  }
})
