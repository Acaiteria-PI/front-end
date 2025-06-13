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
}

.list-card {
  display: flex;

  gap: 16px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.title {
  font-size: 32px;

}

.title-combo {
  font-size: 32px;
  margin-top: 64px;

}

.card {
  background-color: #d9d9d9;
  width: 200px;
  height: 250px;
  border-radius: 16px;
}

</style>
