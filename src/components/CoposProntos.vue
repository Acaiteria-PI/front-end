<script setup></script>

<template>
  <div class="container">
    <div class="title">
      <h1 class="title">Copos pronto</h1>
    </div>
    <div class="list-card">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
        <div class="title">
      <h1 class="title-combo">Combos</h1>
    </div>
    <div class="list-card">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 64px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-card {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.title {
  font-size: 17pt;
  text-align: center;
}

.title-combo {
  font-size: 19pt;
  margin-top: 64px;
  text-align: center;
}

.card {
  background-color: #d9d9d9;
  width: 200px;
  height: 250px;
  border-radius: 16px;
}

</style>
