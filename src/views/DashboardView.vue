<script setup></script>

<template>
  <div class="container">
    <div class="title">
      <h1 class="title-dashboard">Dashboard</h1>
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
        <p class="box-title">Entregas</p>
        <p class="box-number">12</p>
      </div>
    </div>

    <div class="container-2">
      <div class="pedidos">pedidos</div>
      <div class="estoque">estoque</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 64px auto 0 auto;
  width: 1080px;
  height: 565px;
}

.box-title {
  padding-top: 16px;
}

.boxes {
  display: flex;
  gap: 32px;
  margin-top: 23px;
}

.box-pedidos-hoje {
  background-color: #f6c98e;
  width: 160px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  border-radius: 16px;
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
  border-radius: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.box-number {
  text-align: center;
  margin-top: 2px;
  font-size: 20pt;
}

  .container-2 {
    display: flex;
    gap: 354px;
    margin-top: 89px;
  }

.pedidos {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 366px;
  height: 314px;
}

.estoque {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 366px;
  height: 314px;
}
</style>
