<script setup>
import { reactive, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useIngredientStore } from '@/stores/ingredient.js'
import { useModalStore } from '@/stores/modal.js'
import MoneyInput from '@/components/MoneyInput.vue'

const ingredientStore = useIngredientStore()
const modalStore = useModalStore()

defineProps({
  title: { type: String, required: true },
  btnName: { type: String, required: true },
  mode: { type: String, required: true },
  model: { type: Object, required: true }
})

defineEmits(['createStock', 'editStock'])

const fields = reactive([
  {
    id: 'quantity',
    name: 'Quantidade no lote',
    placeholder: '2000',
    type: 'number',
    cols: '2'
  },
  {
    id: 'batch',
    name: 'Lote',
    placeholder: 'Lote A1',
    type: 'text',
    cols: '1'
  },
  {
    id: 'expiration_date',
    name: 'Validade',
    placeholder: '05/02/2027',
    type: 'date',
    cols: '1'
  },
  {
    id: 'supplier',
    name: 'Fornecedor',
    placeholder: 'Fornecedor X',
    type: 'text',
    cols: '2'
  },
  {
    id: 'unit_of_measure',
    name: 'Unidade de medida',
    placeholder: 'Un. do lote',
    type: 'text',
    cols: '1'
  }
])

onMounted(() => {
  ingredientStore.fetchIngredients()
})
</script>

<template>
  <main
    class="w-100 h-fit bg-white rounded-3xl shadow-xl p-6 pt-8 flex flex-col items-center gap-6 mx-4 relative md:mx-0">
    <h1 class="text-3xl font-bold mb-2 text-center">{{ title }}</h1>
    <div
      class="h-8 w-8 rounded-full hover:bg-neutral-200 flex items-center justify-center absolute top-4 right-4 cursor-pointer"
      @click="modalStore.closeCreateModal">
      <X />
    </div>

    <form @submit.prevent="$emit(mode === 'create' ? 'createStock' : 'editStock')"
          class="w-full flex flex-col gap-6">
      <section class="w-full grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1 col-span-2">
          <label for="ingredient">Ingrediente</label>
          <select v-model="model.ingredient" name="ingredient" id="ingredient"
                  class="border border-neutral-300 rounded-xl p-2 w-full h-12">
            <option v-for="ingredient in ingredientStore.ingredients" :key="ingredient.id"
                    :value="ingredient.id">{{ ingredient.name }}
            </option>
          </select>
        </div>

        <div v-for="field in fields" :key="field.id"
             class="flex flex-col gap-1 align-center w-full"
             :class="{ 'col-span-2' : field.cols === '2', 'col-span-1': field.cols === '1' }">
          <label :for="field.id">{{ field.name }}</label>
          <input
            :id="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="model[field.id]"
            class="border border-neutral-300 rounded-xl p-2 w-full h-12"
          />
        </div>
        <div class="flex flex-col gap-1 align-center w-full col-span-1">
          <label for="batch_price">Preço</label>
          <MoneyInput v-model="model.batch_price" />
        </div>
      </section>
      <button type="submit"
              class="w-full h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out">
        {{ btnName }}
      </button>
    </form>
  </main>
</template>

<style scoped></style>
