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
    <div class="w-100 bg-red-50">AAAA</div>
  </div>
</template>
<style scoped>

</style>
