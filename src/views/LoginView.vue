<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'

const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    alert('Login successful!')
  } catch (error) {
    alert('Login failed: ')
  }
}
</script>
<template>
  <div class="container">
    <div class="img">
      <img src="/src/assets/img/Logo.png" alt="" />
    </div>
    <h1>Logar-se</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button type="submit">Logar</button>
    </form>
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
  background-color: #682c48;
  border: none;
  color: white;
}
</style>
