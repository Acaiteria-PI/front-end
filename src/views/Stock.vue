<script setup>
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'

const headers = [
  { name: 'Nome do produto', value: 'name' },
  { name: 'Quantidade', value: 'quantity' },
  { name: 'Unidade', value: 'unit' },
  { name: 'Lote', value: 'batch' },
  { name: 'Validade', value: 'expiryDate' },
]

const products = [
  {
    id: 1,
    name: 'Produto A',
    quantity: 100,
    unit: 'Unidade 1',
    batch: 'Lote 123',
    expiryDate: '2025-12-31',
  },
  {
    id: 2,
    name: 'Produto B',
    quantity: 50,
    unit: 'Unidade 2',
    batch: 'Lote 456',
    expiryDate: '2026-01-15',
  },
  {
    id: 3,
    name: 'Produto C',
    quantity: 200,
    unit: 'Unidade 3',
    batch: 'Lote 789',
    expiryDate: '2024-11-30',
  },
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
