<script setup>
import { onMounted } from 'vue'
import { useOrderItemStore } from '@/stores/orderItem.js'
import { useCustomCupStore } from '@/stores/customCup.js'
import { useRoute } from 'vue-router'
import { useBreakpoint } from '@/composables/useBreakpoint.js'
import { useIngredientStore } from '@/stores/ingredient.js'
import { useOrderStore } from '@/stores/order.js'
import { useRecipientStore } from '@/stores/recipient.js'
import { useFinalCupStore } from './stores/finalCup'
import { useComboStore } from './stores/combo'
import { useStockStore } from './stores/stock'
import NavBar from './components/NavBar.vue'
import MobileNavBar from '@/components/MobileNavBar.vue'

const route = useRoute()
const { isDesktop } = useBreakpoint(768)
</script>

<template>
  <div>
    <div v-if="route.name !== 'login'">
      <header v-if="isDesktop" class="sticky top-0">
        <NavBar />
      </header>

      <div v-else class="bottom-0 fixed w-full px-4 pb-2">
        <MobileNavBar />
      </div>
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
