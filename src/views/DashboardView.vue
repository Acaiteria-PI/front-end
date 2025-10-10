<script setup>
import CoposProntos from '@/components/dashboard/CoposProntos.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import RecentOrders from '@/components/dashboard/RecentOrders.vue'
import StockGraph from '@/components/dashboard/StockGraph.vue'
import { ShoppingBag, PackageX, Truck } from 'lucide-vue-next'

const stats = [
  {
    label: 'Pedidos hoje',
    value: 24,
    change: '+12% vs ontem',
    icon: ShoppingBag,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    changePositive: true
  },
  {
    label: 'Baixo estoque',
    value: 24,
    change: '3 críticos',
    icon: PackageX,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    changePositive: false
  },
  {
    label: 'Entregas',
    value: 24,
    change: '8 pendentes',
    icon: Truck,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    changePositive: true
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
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
