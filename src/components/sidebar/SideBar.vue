<script setup>
import { computed } from 'vue'
import { LogOut, Package, ChefHat, Tag, GlassWater, Gift, Users } from 'lucide-vue-next'
import SideBarItem from './SideBarItem.vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { name: 'Ingredientes', icon: ChefHat, route: '/management-menu/ingredients' },
  { name: 'Estoque', icon: Package, route: '/management-menu/stock' },
  { name: 'Produtos', icon: Tag, route: '/management-menu/products' },
  { name: 'Recipientes', icon: GlassWater, route: '/management-menu/recipients' },
  { name: 'Combos', icon: Gift, route: '/management-menu/combos' }
]
const currentTab = computed(() => {
  return route.path
})

const enterTab = (tab) => {
  currentTab.value = tab
  router.push({ path: tab })
}
</script>

<template>
  <nav
    class="sidebar w-60 h-[calc(100vh-5.5rem)] flex flex-col rounded-2xl gap-6 bg-neutral-100 pt-10">
    <!--    5.5rem é o resultado do tamanho da navbar + seu padding (h-18 + pt-4)-->
    <p class="text-sm text-neutral-500 ml-6">Produtos</p>
    <ul class="flex flex-col gap-4 mb- ml-4">
      <SideBarItem
        v-for="tab in tabs"
        :key="tab.route"
        :name="tab.name"
        :icon="tab.icon"
        :route="tab.route"
        :currentTab="currentTab"
        @click="enterTab(tab.route)"
      />
    </ul>

    <p class="text-sm text-neutral-500 ml-6">Equipe</p>
    <div
      @click="enterTab('employees')"
      class="flex flex-row items-center w-[calc(15rem-24px)] h-10 ml-4 py-4 px-2 gap-2 rounded-lg hover:bg-neutral-300 transition-all cursor-pointer"
      :class="currentTab === 'employees' ? 'text-gray-950 font-semibold' : 'text-neutral-500'"
    >
      <div
        v-if="currentTab === 'employees'"
        class="identifier w-1.5 h-8 bg-pink-900 rounded-lg"
      ></div>
      <Users :size="20" />
      <router-link to="">Funcionários</router-link>
    </div>

    <div
      class="logout mt-auto mb-6 w-fit py-2 px-2 ml-4 rounded-xl hover:bg-neutral-300 transition-colors"
    >
      <router-link to="/login" class="flex flex-row gap-2 items-center text-red-400">
        <LogOut :size="20" color="#ff6467" />
        Sair
      </router-link>
    </div>
  </nav>
</template>

<style scoped></style>
