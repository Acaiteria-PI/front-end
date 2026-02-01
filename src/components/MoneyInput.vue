<script setup>
import { ref, watch } from 'vue'
import { Money3Component, unformat } from 'v-money3'

const props = defineProps({
  modelValue: { type: Number, required: false },
})

const emit = defineEmits(['update:modelValue'])

const price = ref(props.modelValue)

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
  modelModifiers: {
    number: true,
  },
  allowBlank: false,
  minimumNumberOfCharacters: 0,
}

// Esse watch funciona na direção pai -> filho, quando o pai muda o valor, ele atualiza a UI por meio do price
watch(
  () => props.modelValue,
  (newVal) => {
    price.value = newVal
  },
)

// Esse watch funciona na direção filho -> pai, quando o price muda, ele converte o price para number e emite o valor pro pai
watch(price, (newVal) => {
  const numericValue = typeof newVal === 'string' ? unformat(newVal, config) : Number(newVal)
  emit('update:modelValue', numericValue)
})
</script>

<template>
  <Money3Component
    v-model="price"
    v-bind="config"
    class="w-full px-4 py-3 border border-gray-300 rounded-xl"
  />
</template>
