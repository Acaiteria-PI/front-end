<script setup>
import {onMounted, computed} from "vue";
import {IceCreamBowl} from "lucide-vue-next";
import {useIngredientStore} from "@/stores/ingredient.js";
import {useCustomCupStore} from "@/stores/customCup.js";
import {useRecipientStore} from "@/stores/recipient.js";
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'

const loadingStore = useLoading()
const recipientStore = useRecipientStore();
const customCupStore = useCustomCupStore();
const ingredientStore = useIngredientStore();

const addons = computed(() => {
  return ingredientStore.ingredients.filter(ingredient => ingredient.is_addon === true)
})

onMounted(async () => {
  const promises = []
  if (recipientStore.recipients.length === 0) promises.push(recipientStore.fetchRecipients())
  if (ingredientStore.ingredients.length === 0) promises.push(ingredientStore.fetchIngredients())
  if (customCupStore.customCups.length === 0) promises.push(customCupStore.customCups)

  if (promises.length === 0) return

  try {
    loadingStore.isLoading = true
    await Promise.all(promises)
  } catch (error) {
    console.log('Error fetching data for custom cup form:', error)
  } finally {
    loadingStore.isLoading = false
  }
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <IceCreamBowl :size="20" class="mr-2 text-rose-900"/>
      Conteúdo do Copo
    </h2>

    <!-- Recipiente -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Recipiente
      </label>
      <select
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        v-model="customCupStore.newCustomCup.recipient"
      >
        <option :value="null" disabled>Selecione o recipiente</option>
        <option v-for="recipient in recipientStore.recipients" :key=recipient.id :value="recipient.id">
          {{ recipient.title }}
        </option>
      </select>
    </div>

    <!-- Ingredientes -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Ingredientes
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label
          v-for="ingredient in addons"
          :key="ingredient.id"
          class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
        >
          <input
            type="checkbox"
            :value="ingredient.id"
            v-model="customCupStore.newCustomCup.ingredient"
            class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span class="ml-3 text-gray-700">{{ ingredient.name }}</span>
          <span class="ml-auto text-sm text-gray-500">+R$ {{ ingredient.price }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
