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
  
</template>
<style scoped>

</style>
