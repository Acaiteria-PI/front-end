<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStockStore } from '@/stores/stock.js'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import RecentOrders from '@/components/dashboard/RecentOrders.vue'
import StockGraph from '@/components/dashboard/StockGraph.vue'
import { useOrderItemStore } from '@/stores/orderItem.js'
import { useOrderStore } from '@/stores/order.js'
import { PackageX, ShoppingBag, BanknoteArrowUp } from 'lucide-vue-next'

const orderItemStore = useOrderItemStore()
const stockStore = useStockStore()
const orderStore = useOrderStore()

const ordersLength = computed(() => {
  return orderStore.orders.length
})

const orderItemsLength = computed(() => {
  return orderItemStore.orderItems.length + ' itens ao total'
})

const lowStockItems = computed(() => {
  return stockStore.lowStockItems.length
})

const totalAmount = computed(() => {
  let total = 0
  for (const order of orderStore.orders) {
    total += Number(order.total_amount)
  }
  return `R$ ${ total.toFixed(2).replace('.', ',') }`
})

const stats = reactive([
  {
    label: 'Pedidos hoje',
    value: ordersLength,
    change: orderItemsLength,
    icon: ShoppingBag,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    changePositive: true
  },
  {
    label: 'Baixo estoque',
    value: lowStockItems,
    icon: PackageX,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    changePositive: false
  },
  {
    label: 'Faturamento de hoje',
    value: totalAmount,
    icon: BanknoteArrowUp,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    changePositive: true
  }
])
</script>

<template>
  <div class="min-h-full bg-gray-50 p-8 pb-20 md:pb-20">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
    <DashboardCard :stats="stats" />
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      <div class="lg:col-span-5">
        <RecentOrders />
      </div>
      <div class="lg:col-span-7">
        <StockGraph />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
