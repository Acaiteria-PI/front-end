<script setup>
import {DollarSign} from "lucide-vue-next";
import {useOrderStore} from "@/stores/order.js";
import {useOrderItemStore} from "@/stores/orderItem.js";
import {useCustomCupStore} from "@/stores/customCup.js";
import {onMounted} from "vue";
import {useIngredientStore} from "@/stores/ingredient.js";
import {useRecipientStore} from "@/stores/recipient.js";

const recipientStore = useRecipientStore()
const ingredientStore = useIngredientStore();
const orderItemStore = useOrderItemStore();
const orderStore = useOrderStore();
const customCupStore = useCustomCupStore();

onMounted(async () => {
  await orderItemStore.fetchOrderItems()
  await orderStore.fetchOrders()
  await customCupStore.fetchCustomCups();
  await ingredientStore.fetchIngredients();
  await recipientStore.fetchRecipients();
})

function getTotalPrice() {
  const recipientPrice = recipientStore.recipients.find(r => r.id === customCupStore.newCustomCup.recipient) || 0
  let total = Number(recipientPrice.price || 0)
  for (const i of customCupStore.newCustomCup.ingredient) {
    const ingredientPrice = ingredientStore.ingredients.find(ing => ing.id === i).price
    total += Number(ingredientPrice)
  }
  return total
}

const getIngredientNames = () => {
  let filteredIngredients = []
  for (const ingredient of customCupStore.newCustomCup.ingredient) {
    console.log(ingredient)
    for (const i of ingredientStore.ingredients) {
      console.log(i.id)
      if (ingredient === i.id) {
        filteredIngredients.push(i.name)
      }
    }
  }
  return filteredIngredients.join(', ')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <DollarSign :size="20" class="mr-2 text-green-600"/>
      Resumo do Pedido
    </h2>

    <div class="space-y-3">
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <span class="text-gray-600">Preço da unidade:</span>
        <span class="text-lg font-semibold text-gray-800">R$ preço</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-gray-600">Ingredientes adicionais:</span>
        <span class="text-lg font-semibold text-gray-800">{{ getIngredientNames() }}</span>
      </div>
      <div class="flex justify-between items-center py-3 border-t-2 border-gray-200">
        <span class="text-lg font-semibold text-gray-800">Preço final:</span>
        <span class="text-2xl font-bold text-purple-600">R$ {{
            getTotalPrice().toFixed(2).replace('.', ',')
          }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
