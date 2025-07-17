<script setup>
import NavBar from '@/components/NavBar.vue'
import CoposProntos from '@/components/CoposProntos.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import RecentOrders from '@/components/RecentOrders.vue'
import StockGraph from '@/components/StockGraph.vue'
</script>

<template>
  <div class="flex flex-col mx-auto my-16 px-40 w-full h-fit">
    <div class="title">
      <h1 class="text-3xl font-semibold">Dashboard</h1>
    </div>
    <div class="flex gap-8 mt-6">
      <DashboardCard title="Ped. hoje" quantity="24" colorClass="orange" />
      <DashboardCard title="Baixo estoque" quantity="3" colorClass="green" />
      <DashboardCard title="Entregas" quantity="12" colorClass="red" />
    </div>

    <section class="flex justify-between mt-16">
      <RecentOrders />
      <StockGraph />
    </section>
    <CoposProntos />
  </div>
</template>

<style scoped>
</style>
