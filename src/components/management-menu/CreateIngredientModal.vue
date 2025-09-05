<script setup>
import { reactive } from 'vue'
import { useIngredientStore } from '@/stores/ingredient.js'

const ingredientStore = useIngredientStore()

const fields = reactive([
  {
    id: 'name',
    name: 'Nome',
    placeholder: 'Açaí',
    type: 'text'
  },
  {
    id: 'portion',
    name: 'Porção',
    placeholder: '50',
    type: 'number'
  },
  {
    id: 'quantity',
    name: 'Quantidade no lote',
    placeholder: '2000',
    type: 'number'
  },
  {
    id: 'price',
    name: 'Preço',
    placeholder: 'R$5,00',
    type: 'number'
  },
  {
    id: 'expirationDate',
    name: 'Validade',
    placeholder: '05/02/2027',
    type: 'date'
  }
])
</script>

<template>
  <main v-if="ingredientStore.isModalOpen" class="w-100 h-fit bg-white rounded-2xl shadow-xl p-6 pt-8 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">Cadastrar ingrediente</h1>
    <section class="w-full flex flex-col gap-4">
      <div v-for="field in fields.slice(0, 2)" :key="field.id"
           class="flex flex-col gap-1 align-start w-full">
        <label :for="field.id">{{ field.name }}</label>
        <input
          :id="field.id"
          :type="field.type"
          :placeholder="field.placeholder"
          class="border border-neutral-300 rounded-xl p-2 w-full h-12"
        />
      </div>
      <select name="unity" id="unity" class="border border-neutral-300 rounded-xl p-2 w-full h-12">
        <option value="">Escolha uma opção</option>
        <option value="g">Grama (g)</option>
        <option value="g">Quilograma (kg)</option>
        <option value="ml">Mililitro (ml)</option>
        <option value="l">Litro (L)</option>
      </select>
      <div v-for="field in fields.slice(2)" :key="field.id"
           class="flex flex-col gap-1 align-start w-full">
        <label :for="field.id">{{ field.name }}</label>
        <input
          :id="field.id"
          :type="field.type"
          :placeholder="field.placeholder"
          class="border border-neutral-300 rounded-xl p-2 w-full h-12"
        />
      </div>
      <button type="submit"
              class="w-ful h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out">
        Cadastrar
      </button>
    </section>
  </main>
</template>

<style scoped></style>
