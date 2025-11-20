<script setup>
import { useAuth } from '@/stores/auth.js'
import { ShoppingBag, House, Package } from 'lucide-vue-next'

const authStore = useAuth()
</script>
<template>

  <main class="w-full h-14 flex items-center justify-center bg-white shadow-md rounded-2xl">
    <ul class="flex w-full items-center justify-around">
      <li>
        <router-link to="/"
                     class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1">
          <House />
        </router-link>
      </li>
      <li>
        <router-link
          to="/management-menu"
          class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1"
        >
          <Package />
        </router-link>
      </li>
      <li>
        <router-link
          to="/orders"
          class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1"
        >
          <ShoppingBag />
        </router-link>
      </li>
      <li v-if="authStore.isLoggedIn"
          class="bg-rose-900 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-rose-950 transition-colors shadow-md"
          title="Perfil"
      >
        <p class="text-white font-semibold text-sm">{{ authStore.firstLetter }}</p>
      </li>
    </ul>
  </main>
</template>
