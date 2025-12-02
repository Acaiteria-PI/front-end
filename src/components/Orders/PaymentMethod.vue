<script setup>
import { Check } from 'lucide-vue-next'

const emit = defineEmits(['update:received', 'update:selected-method'])

defineProps({
  method: {
    type: Object,
    required: true
  },
  received: {
    type: [Number, null],
    default: null
  },
  selectedMethod: {
    type: [String, null],
    required: true
  },
  change: {
    type: Number,
    required: false
  }
})
</script>

<template>
    <div
      @click="$emit('update:selected-method', method.id)"
      :class="[
            'bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md',
            selectedMethod === method.id ? 'border-green-500 bg-green-50' : 'border-gray-100'
          ]"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div
            :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  selectedMethod === method.id ? 'bg-green-100' : 'bg-gray-50'
                ]"
          >
            <component
              :is="method.icon"
              :size="24"
              :class="selectedMethod === method.id ? 'text-green-600' : 'text-gray-600'"
            />
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800">
              {{ method.name }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ method.description }}
            </p>
          </div>
        </div>

        <div
          v-if="selectedMethod === method.id"
          class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check :size="16" class="text-white" stroke-width="3" />
        </div>
        <div
          v-else
          class="w-6 h-6 border-2 border-gray-300 rounded-full"
        ></div>
      </div>
    </div>
</template>
