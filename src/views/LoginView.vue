<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'
import { OctagonX } from 'lucide-vue-next'

const authStore = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
  } catch (err) {
    errorMessage.value = err.response?.data.detail
  }
}
</script>
<template>
  <main class="w-80 h-fit absolute m-auto top-0 bottom-0 left-0 right-0 flex flex-col gap-8">
    <div class="logo-container w-16 mx-auto">
      <img src="/src/assets/img/logo.png" />
    </div>
    <div class="login-container flex flex-col gap-8">
      <h1 class="text-3xl font-medium mx-auto">Seja bem-vindo!</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="w-full h-15 flex items-center p-4 mb-8 border border-solid border-black rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="w-full h-15 flex items-center p-4 mb-4 border border-solid border-black rounded-xl"
        />
        <div v-if="errorMessage && password" class="error-message flex gap-2 mt--4 justify-center align-center">
          <OctagonX :size="16" class="text-red-800" />
          <p class="text-red-800 text-sm">{{ errorMessage }}</p>
        </div>
        <button
          type="submit"
          class="w-full h-15 mt-4 rounded-xl bg-pink-950 text-white font-bold cursor-pointer hover:bg-rose-950 transition delay-150ms ease-in-out"
        >
          Logar
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
