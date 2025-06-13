<script setup></script>

<template>
  <div class="content-pedidos">
    <p class="section-title">Pedidos Recentes</p>
    <div class="pedidos">
      <div class="list-pedidos">
        <div class="numero-pedido">#007</div>
        <div class="nome-pedido">Pedido normal</div>
        <div class="preco-pedido">R$17,90</div>
      </div>
      <div class="list-pedidos">
        <div class="numero-pedido">#006</div>
        <div class="nome-pedido">Combo</div>
        <div class="preco-pedido">R$17,90</div>
      </div>
      <div class="list-pedidos">
        <div class="numero-pedido">#005</div>
        <div class="nome-pedido">Pedido normal</div>
        <div class="preco-pedido">R$17,90</div>
      </div>
      <div class="list-pedidos">
        <div class="numero-pedido">#004</div>
        <div class="nome-pedido">Combo</div>
        <div class="preco-pedido">R$17,90</div>
      </div>
      <div class="list-pedidos">
        <div class="numero-pedido">#003</div>
        <div class="nome-pedido">Combo</div>
        <div class="preco-pedido">R$17,90</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-pedidos {
  display: flex;
  flex-direction: column;
}
.section-title {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 12px;
}
.pedidos {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 366px;
  height: 314px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  gap: 8px;
}
.list-pedidos {
  background-color: #fbf3e5;
  width: 334px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.numero-pedido {
  font-weight: bold;
  margin-left: 16px;
}
.nome-pedido {
  margin-left: 14px;
  width: 110px;
}

.preco-pedido {
  margin-left: 32px;
}
</style>
