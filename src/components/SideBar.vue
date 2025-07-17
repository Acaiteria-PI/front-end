<script setup>
import { ref } from 'vue'
import { LogOut, Package, Tag, GlassWater, Gift, Users } from 'lucide-vue-next'

const tabs = ref(['stock', 'products', 'recipients', 'combos', 'employees'])
const currentTab = ref('stock')
</script>

<template>
  <nav class="sidebar w-60 h-[calc(100vh-4.5rem)] flex flex-col gap-6 bg-neutral-100 pt-10 pl-6">
    <p class="text-sm text-neutral-500">Produtos</p>
    <ul class="flex flex-col gap-8 mb-6">
      <li
        class="flex flex-row items-center gap-2"
        :class="currentTab == 'stock' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
      >
        <Package :size="20" />
        <router-link>Estoque</router-link>
      </li>
      <li
        class="flex flex-row gap-2 items-center"
        :class="currentTab == 'products' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
      >
        <Tag :size="20" class="text-neutral-500" />
        <router-link>Produtos</router-link>
      </li>
      <li
        class="flex flex-row gap-2 items-center"
        :class="currentTab == 'recipients' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
      >
        <GlassWater :size="20" class="text-neutral-500" />
        <router-link>Recipientes</router-link>
      </li>
      <li
        class="flex flex-row gap-2 items-center"
        :class="currentTab == 'combos' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
      >
        <Gift :size="20" class="text-neutral-500" />
        <router-link>Combos</router-link>
      </li>
    </ul>

    <p class="text-sm text-neutral-500">Equipe</p>
    <div
      class="flex flex-row gap-2 items-center"
      :class="currentTab == 'employees' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
    >
      <Users :size="20" />
      <router-link>Funcionários</router-link>
    </div>

    <div class="logout mt-auto">
      <router-link to="/login" class="flex flex-row items-center">
        <LogOut :size="20" color="#ff6467" />
        <button class="text-red-400 p-2 rounded">Sair</button>
      </router-link>
    </div>
  </nav>
</template>

<style scoped></style>
