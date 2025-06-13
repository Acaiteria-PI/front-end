<script setup>
defineProps(['title', 'quantity', 'colorClass'])
</script>

<template>
  <div class="card" :class="colorClass">
    <p class="card-title">{{ title }}</p>
    <p class="card-number">24</p>
  </div>
</template>

<style scoped>
.card {
  background-color: #f6c98e;
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
.orange {
  background-color: #f6c98e;
}
.green {
  background-color: rgba(140, 195, 167, 0.45);
}
.red {
  background-color: #EEA5A0;
}
.card-title {
  padding-top: 1rem;
}
.card-number {
  text-align: center;
  margin-top: 2px;
  font-size: 20pt;
}
</style>
