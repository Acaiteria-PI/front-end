<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChefHat, Gift, GlassWater, LogOut, Package, Tag, Users, Menu } from 'lucide-vue-next'
import SideBarItem from './SideBarItem.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()


const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

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
  router.push({ path: tab })
  sidebarOpen.value = false 
}
</script>

<template>


<button
  class="lg:hidden fixed top-4 right-4 z-1000 bg-neutral-100 p-2 rounded-xl shadow"
  @click="toggleSidebar"
>
  <Menu :size="24" />
</button>


  <nav
    :class="[
      'sidebar w-60 h-[calc(100vh-6rem)] flex flex-col rounded-2xl gap-6 bg-neutral-100 pt-10',
      sidebarOpen ? 'active' : ''
    ]"
  >
    <p class="text-sm text-neutral-500 ml-6">Produtos</p>
    <ul class="flex flex-col gap-4 ml-4">
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
    <div class="ml-4">
      <SideBarItem
        name="Funcionários"
        :icon="Users"
        route="/management-menu/employees"
        @click="enterTab('/management-menu/employees')"
        :currentTab="currentTab"
      />
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

<style scoped>
.sidebar {
  transition: transform 0.3s ease;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 270px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    z-index: 999;
    border-radius: 0;
    padding-top: 6rem;
  }

  .sidebar.active {
    transform: translateX(0);
  }
}

</style>
