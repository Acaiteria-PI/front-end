<script setup>
import { ref, watch } from 'vue'
import { Money3Component } from 'v-money3'

const props = defineProps({
  modelValue: { type: Number, required: false }
})

const emit = defineEmits(['update:modelValue'])

const price = ref(Number(props.modelValue))

const config = {
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  disableNegative: true,
  disabled: false,
  min: 0,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0
}

watch(() => props.modelValue, (newVal) => {
  price.value = newVal
})

watch(price, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <Money3Component
    v-model="price"
    v-bind="config"
    class="w-full px-4 py-3 border border-gray-300 rounded-xl"
  />
</template>
