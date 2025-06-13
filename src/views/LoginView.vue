<script setup></script>
<template>
  <div class="container">
    <div class="img">
      <img src="/src/assets/img/Logo.png" alt="" />
    </div>
    <h1>Logar-se</h1>
    <input type="email" placeholder="Email"/>
    <input type="password" placeholder="Senha"/>
    <button>Logar</button>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 90vh;
}

.img {
  width: 4rem;
  height: 3.5rem;
}

input {
  width: 20rem;
  height: 3.75rem;
  border-radius: 0.75rem;
  border: 1px solid black;
}

input::placeholder {
  padding: 0 1rem;
}

button {
  width: 20rem;
  height: 3.75rem;
  border-radius: 0.75rem;
  background-color: #682C48;
  border: none;
  color: white;
}
</style>
