<script setup>
import {useOrderItemStore} from "@/stores/orderItem.js";
import {Coffee, ShoppingBag, ShoppingCart, Sparkles, Trash} from "lucide-vue-next";
import {computed} from "vue";
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import { useModalStore } from '@/stores/modal.js'
import { useComboStore } from '@/stores/combo.js'
import { useFinalCupStore } from '@/stores/finalCup.js'
import { useCustomCupStore } from '@/stores/customCup.js'
import { useLoading } from '@/stores/loading.js'
import { onMounted } from 'vue'

const modalStore = useModalStore()
const orderItemStore = useOrderItemStore();
const comboStore = useComboStore();
const finalCupStore = useFinalCupStore();
const customCupStore = useCustomCupStore();
const loadingStore = useLoading();

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  orderItem: {
    type: Object,
    required: true
  }
});

const getItemIcon = (type) => {
  const icons = {
    'CUSTOM_CUP': Sparkles,
    'FINAL_CUP': Coffee,
    'COMBO': ShoppingCart
  };
  return icons[type] || ShoppingBag;
};

const getItemIconColor = (type) => {
  const colors = {
    'CUSTOM_CUP': 'text-purple-600',
    'FINAL_CUP': 'text-blue-600',
    'COMBO': 'text-orange-600'
  };
  return colors[type] || 'text-gray-600';
};

const customCup = computed(() => {
  return orderItemStore.getCupById(props.orderItem.custom_cup, 'CUSTOM_CUP');
})

const finalCup = computed(() => {
  return orderItemStore.getCupById(props.orderItem.final_cup, 'FINAL_CUP');
})

const combo = computed(() => {
  return orderItemStore.getCupById(props.orderItem.combo, 'COMBO');
})

const recipientName = computed(() => {
  if (!customCup.value || !customCup.value.recipient_data) return ''

  return customCup.value?.recipient_data?.title || ''
})

const ingredientsNames = computed(() => {
  if (!customCup.value || !customCup.value.ingredient_data) return ''

  return customCup.value?.ingredient_data?.map(ingredient => ingredient.name)?.join(', ')
})

onMounted(async() => {
  try {
    loadingStore.isLoading = true
    const promises = []

    if (finalCupStore.finalCups.length === 0) promises.push(finalCupStore.fetchFinalCups())
    if (customCupStore.customCups.length === 0) promises.push(customCupStore.fetchCustomCups())
    if (comboStore.combos.length === 0) promises.push(comboStore.fetchCombos())

    if (promises.length === 0) return

    await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching data for created order item:', error)
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <div
    class="bg-white rounded-lg p-4 border border-gray-200"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <component
            :is="getItemIcon(orderItem.type)"
            :size="18"
            :class="getItemIconColor(orderItem.type)"
          />
          <span class="font-medium text-gray-800">{{ orderItem.type || '' }}</span>
        </div>

        <!-- Detalhes do Item (CUSTOM CUP) -->
        <div v-if="orderItem.type === 'CUSTOM_CUP'" class="ml-6 space-y-1">
          <div
            class="text-sm"
          >
            <span class="text-gray-500">Recipiente:</span>
            <span class="text-gray-700 ml-1">{{ recipientName || '' }}</span>
          </div>

          <div
            class="text-sm"
          >
            <span class="text-gray-500">Ingredientes:</span>
            <span class="text-gray-700 ml-1">{{ ingredientsNames || '' }}</span>
          </div>
        </div>

        <!-- Detalhes do Item (FINAL CUP) -->
        <div v-else-if="orderItem.type === 'FINAL_CUP'" class="ml-6 space-y-1">
          <div
            class="text-sm"
          >
            <span class="text-gray-500">Nome:</span>
            <span class="text-gray-700 ml-1">{{ finalCup?.name || '' }}</span>
          </div>
        </div>

        <!-- Detalhes do Item (COMBO) -->
        <div v-else-if="orderItem.type === 'COMBO'" class="ml-6 space-y-1">
          <div
            class="text-sm"
          >
            <span class="text-gray-500">Nome:</span>
            <span class="text-gray-700 ml-1">{{ combo?.name || '' }}</span>
          </div>
        </div>
      </div>

      <div class="text-right">
        <p class="text-lg font-semibold text-gray-800">R$ {{
            orderItem.total_price.replace('.', ',')
          }}</p>
      </div>
      <div @click="modalStore.openConfirmDeleteModal(orderItem.id)" class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
        <Trash size="20" />
      </div>

      <div v-if="modalStore.confirmDeleteModal === true"
           class="fixed inset-0 flex items-center justify-center">
        <ConfirmDeleteModal @confirm="orderItemStore.deleteOrderItem(modalStore.itemToDelete)"
                            @cancel="modalStore.closeConfirmDeleteModal"
                            class="absolute inset-0 m-auto z-50" />
        <div class="fixed inset-0 bg-black/20 z-40"></div>
      </div>

    </div>
  </div>
</template>
