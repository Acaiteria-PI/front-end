<script setup>
import { DollarSign } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order.js'
import { onMounted } from 'vue'
import { useFinalCupStore } from '@/stores/finalCup'

defineProps({
  selectedCup: {
    type: [Number, null],
  },
})

const finalCupStore = useFinalCupStore()
const orderStore = useOrderStore()

const getCupDetails = (cup) => {
  const selected = finalCupStore.finalCups.find((c) => c.id === cup)
  return selected
}

const getCupIngredients = (cup) => {
  const selected = finalCupStore.finalCups.find((c) => c.id === cup)
  if (!selected) return ''
  
  return selected.ingredient_data.map(ing => ing.name).join(', ') // map transforma a lista de objetos (ingredients) em uma lista só com os nomes deles
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <DollarSign :size="20" class="mr-2 text-green-600" />
      Resumo do Pedido
    </h2>

    <div class="space-y-3">
      <div class="flex justify-between items-center py-2">
        <span class="text-gray-600">Nome do produto:</span>
        <span class="text-lg font-semibold text-gray-800">{{
          getCupDetails(selectedCup)?.name
        }}</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-gray-600">Tamanho do copo:</span>
        <span class="text-lg font-semibold text-gray-800"
          >{{ getCupDetails(selectedCup)?.recipient_data.quantity_ml }}ml</span
        >
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-gray-600">Ingredientes:</span>
        <span class="text-lg font-semibold text-gray-800">{{ getCupIngredients(selectedCup) }}</span>
      </div>
      <div class="flex justify-between items-center py-3 border-t-2 border-gray-200">
        <span class="text-lg font-semibold text-gray-800">Preço final:</span>
        <span class="text-2xl font-bold text-blue-600"
          >R$ {{ getCupDetails(selectedCup)?.price.replace('.', ',') }}
        </span>
      </div>
    </div>
  </div>
</template>
