<script setup>
import {useAuth} from '@/stores/auth.js'
import {ShoppingBag} from 'lucide-vue-next'
import {useOrderStore} from "@/stores/order.js";

const orderStore = useOrderStore()
const authStore = useAuth()
</script>

<template>

  <div class="px-4 pt-2 mt-4">
    <main
      class="w-full h-18 flex items-center justify-between px-12 bg-white shadow-md inset-shadow-sm inset-shadow-zinc-200 rounded-2xl">
      <router-link to="/"
                   class="image-container w-16 cursor-pointer hover:opacity-80 transition-opacity">
        <img src="../assets/img/logo.png" alt="Logo Pé de Açaí"
             class="w-full h-full object-contain"/>
      </router-link>
      <nav>
        <ul class="flex gap-12 items-center">
          <li>
            <router-link
              to="/"
              class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1"
            >
              Início
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-900 transition-all group-hover:w-full"></span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/management-menu"
              class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1"
            >
              Menu de gerenciamento
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-900 transition-all group-hover:w-full"></span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/orders/create"
              class="text-neutral-700 font-medium hover:text-rose-900 transition-colors relative group pb-1"
            >
              Pedidos
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-900 transition-all group-hover:w-full"></span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-6">
        <div>
          <router-link to="/orders"
                       class="relative flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <ShoppingBag size="28"/>
            <div v-if="orderStore.orders.length > 0"
                 class="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {{ orderStore.orders.length }}
            </div>
          </router-link>
        </div>
        <div v-if="authStore.isLoggedIn"
             class="bg-rose-900 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:bg-rose-950 transition-colors shadow-md"
             title="Perfil"
        >
          <p class="text-white font-semibold text-lg">{{ authStore.firstLetter }}</p>
        </div>
        <router-link v-else to="/login">
          <div
            class="px-6 h-11 rounded-full flex items-center justify-center cursor-pointer bg-rose-900 hover:bg-rose-950 transition-all shadow-md hover:shadow-lg"
          >
            <p class="text-white font-medium">Login</p>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
.router-link-active span {
  width: 100%;
}
</style>
