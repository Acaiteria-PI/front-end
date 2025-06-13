<script setup></script>

<template>
  <div class="content-estoque">
    <p class="section-title">Estoque Baixo</p>
    <div class="estoque"></div>
  </div>
</template>

<style scoped>
.content-estoque {
  display: flex;
  flex-direction: column;
}
.section-title {
  font-weight: bold;
  font-size: 1.rem;
  margin-bottom: 12px;
}
.estoque {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 366px;
  height: 314px;
  border-radius: 16px;
}
</style>