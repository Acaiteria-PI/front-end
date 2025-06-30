<script setup>
import { ShoppingBag } from 'lucide-vue-next'
</script>

<template>
  <main class="w-full h-18 flex items-center justify-between px-12 bg-amber-50 border-b-1 border-neutral-200">
    <div class="image-container w-16 cursor-pointer">
      <img src="../assets/img/logo.png" alt="" />
    </div>
    <ul class="nav flex gap-10">
      <li class="hover:underline"><router-link to="/">Início</router-link></li>
      <li class="hover:underline">
        <router-link to="menu-de-gerenciamento">Menu de gerenciamento</router-link>
      </li>
      <li class="hover:underline"><router-link to="cardapio">Cardápio</router-link></li>
    </ul>
    <div class="login-bag-wrapper flex items-center gap-8">
      <div class="cursor-pointer rounded-full hover:bg-zinc-200 transition delay-150ms ease-in-out">
        <ShoppingBag />
      </div>
      <div
        class="w-25 h-10 rounded-full flex items-center justify-center cursor-pointer bg-rose-900 hover:bg-rose-950 transition delay-150ms ease-in-out"
      >
        <router-link to="/login" class="text-white">Login</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
