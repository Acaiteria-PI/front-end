<script setup>
import NavBar from '@/components/NavBar.vue'
import CoposProntos from '@/components/CoposProntos.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import RecentOrders from '@/components/RecentOrders.vue'
import StockGraph from '@/components/StockGraph.vue'
</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="title">
      <h1 class="title-dashboard">Dashboard</h1>
    </div>
    <div class="boxes">
      <DashboardCard title="Ped. hoje" quantity="24" colorClass="orange" />
      <DashboardCard title="Baixo estoque" quantity="3" colorClass="green" />
      <DashboardCard title="Entregas" quantity="12" colorClass="red" />
    </div>

    <section class="order-stock-info">
      <RecentOrders />
      <StockGraph />
    </section>
  <CoposProntos />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 4rem auto 4rem auto;
  width: 1080px;
  height: 565px;
}

.boxes {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.box-estoque-baixo {
  background-color: #8cc3a777;
  width: 160px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.box-entregas {
  background-color: #eea5a0;
  width: 160px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.order-stock-info {
  display: flex;
  gap: 354px;
  margin-top: 4rem;
}
</style>
