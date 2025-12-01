<script setup>
import { DollarSign } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order.js'
import { onMounted } from 'vue'
import { useComboStore } from '@/stores/combo.js'

defineProps({
  selectedCombo: {
    type: [Number, null],
  },
})

const comboStore = useComboStore()
const orderStore = useOrderStore()

const getComboDetails = (combo) => {
  const selected = comboStore.combos.find((c) => c.id === combo)
  return selected
}

const getComboCups = (combo) => {
  if (!combo) return ''
  const selectedCombo = comboStore.combos.find((c) => c.id === combo)

  return selectedCombo.final_cup_data.map((data) => data.name).join(' + ') // map transforma a lista de objetos (final_cup_data) em uma lista só com os nomes deles
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
          getComboDetails(selectedCombo)?.name
        }}</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-gray-600">Produtos:</span>
        <span class="text-lg font-semibold text-gray-800">{{ getComboCups(selectedCombo) }}</span>
      </div>
      <div class="flex justify-between items-center py-3 border-t-2 border-gray-200">
        <span class="text-lg font-semibold text-gray-800">Preço final:</span>
        <span class="text-2xl font-bold text-blue-600"
          >R$ {{ getComboDetails(selectedCombo)?.price.replace('.', ',') }}
        </span>
      </div>
    </div>
  </div>
</template>
