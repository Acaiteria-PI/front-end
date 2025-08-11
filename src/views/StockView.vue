<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useIngredient } from '@/composables/useIngredient'

const { fetchIngredients } = useIngredient()

onMounted(() => {
  fetchIngredients()
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
      <NewProductBtn />
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="products" />
  </div>
</template>

<style scoped></style>
