<script setup>
import { IceCreamBowl, Check, } from "lucide-vue-next";

defineProps({
  combo: {
    type: Object,
    required: true,
  },
  selectedCombo: {
    type: [Number, null],
  }
});

const getComboCups = (combo) => {
  if (!combo) return ''
  
  return combo.final_cup_data.map(data => data.name).join(' + ') // map transforma a lista de objetos (final_cup_data) em uma lista só com os nomes deles
};
</script>

<template>
  <div
    :class="[
      'bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md',
      selectedCombo === combo.id ? 'border-rose-900 bg-rose-50' : 'border-gray-100',
    ]"
  >
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
        <IceCreamBowl :size="24" class="text-rose-900" />
      </div>

      <div
        v-if="selectedCombo === combo.id"
        class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
      >
        <Check :size="16" class="text-white" stroke-width="3" />
      </div>
      <div v-else class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
    </div>

    <!-- infos -->
    <div class="space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-1">
          {{ combo.name }}
        </h3>
      </div>

      <div class="pt-3 border-t border-gray-100 space-y-2">
        <div>
          <p class="text-xs text-gray-500 mb-1">Copos:</p>
          <div class="flex flex-wrap gap-1">
            <span
              class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {{ getComboCups(combo) }}
            </span>
          </div>
        </div>

        <div class="pt-2">
          <p class="text-2xl font-bold text-blue-600">R$ {{ combo.price.replace(".", ",") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
