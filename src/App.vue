<script setup>
import {onMounted} from 'vue'
import {useOrderItemStore} from '@/stores/orderItem.js'
import {useCustomCupStore} from '@/stores/customCup.js'
import {useRoute} from 'vue-router'
import NavBar from './components/NavBar.vue'
import {useBreakpoint} from '@/composables/useBreakpoint.js'
import {useIngredientStore} from '@/stores/ingredient.js'
import {useRecipientStore} from '@/stores/recipient.js'
import MobileNavBar from '@/components/MobileNavBar.vue'

const route = useRoute()
const recipientStore = useRecipientStore();
const ingredientStore = useIngredientStore();
const orderItemStore = useOrderItemStore();
const customCupStore = useCustomCupStore();
const {isDesktop} = useBreakpoint(768)

onMounted(async () => {
  await orderItemStore.fetchOrderItems();
  await customCupStore.fetchCustomCups();
  await ingredientStore.fetchIngredients()
  await recipientStore.fetchRecipients()
});
</script>

<template>
  <div>
    <div v-if="route.name !== 'login'">
      <header v-if="isDesktop" class="sticky top-0">
        <NavBar/>
      </header>

      <div v-else class="bottom-0 fixed w-full px-4 pb-2">
        <MobileNavBar/>
      </div>
    </div>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<style scoped>

</style>
