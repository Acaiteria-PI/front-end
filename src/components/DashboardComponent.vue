<script setup></script>

<template>
<div class="container">
<div class="title">
  <h1>Dashboard</h1>
</div>
<div class="boxes">
  <div class="box-pedidos-hoje">
    <p class="box-title">Pedidos de Hoje</p>
    <p class="box-number">24</p>
  </div>

  <div class="box-estoque-baixo">
    <p class="box-title">Estoque Baixo</p>
    <p class="box-number">3</p>
  </div>

  <div class="box-entregas">
    <p class="box-title">Entregas Realizadas</p>
    <p class="box-number">12</p>
  </div>
</div>

</div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-left: 50px;
}

.boxes {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.box-pedidos-hoje {
  background-color: #F6C98E;
  width: 160px;
  height: 90px;
  padding: 10px;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-weight: bold;
}

.box-estoque-baixo {
  background-color: #8CC3A777;
  width: 160px;
  height: 90px;
  padding: 10px;
  font-weight: bold;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.box-entregas {
  background-color: #EEA5A0;
  width: 160px;
  height: 90px;
  padding: 10px;
  font-weight: bold;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.box-number {
  text-align: center;
  margin-top: 10px;
  font-size: 20pt;
}

</style>
