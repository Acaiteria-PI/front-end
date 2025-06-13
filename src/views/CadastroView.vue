<script setup></script>
<template>
  <div class="container">
    <div class="img">
      <img src="/src/assets/img/Logo.png" alt="" />
    </div>
    <h1>Cadastrar-se</h1>
    <input type="name" placeholder="Nome">
    <input type="email" placeholder="Email"/>
    <input type="number" placeholder="Registro"/>
    <select name="Estabelecimento" id="" placeholder="Estabelecimento">
      <option value="">Pé de Açai</option>
      <option value="">Açai do zezinho</option>
      <option value="">Açai de pé</option>
      <option value="">The Best Açai</option>
      <option value="">vida açai</option>
    </select>
    <button>Cadastrar</button>
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

select {
  width: 20rem;
  height: 3.75rem;
  border-radius: 0.75rem;
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
