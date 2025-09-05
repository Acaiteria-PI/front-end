<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useIngredientStore } from '@/stores/ingredient'
import CreateIngredientModal from '@/components/management-menu/CreateIngredientModal.vue'

const ingredientStore = useIngredientStore()

onMounted(() => {
  ingredientStore.fetchIngredients()
})

const headers = [
  { name: 'Nome do produto', value: 'name' },
  { name: 'Quantidade', value: 'quantity' },
  { name: 'Unidade', value: 'unit' },
  { name: 'Lote', value: 'batch' },
  { name: 'Validade', value: 'expiryDate' },
]
</script>

<template>
  <div class="w-full p-8">
    <SectionTitle title="Stock Management" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <NewProductBtn @click="ingredientStore.openModal" />
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="ingredientStore.ingredients" />
      <CreateIngredientModal />
  </div>
</template>

<style scoped></style>
