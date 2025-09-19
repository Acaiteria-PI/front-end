<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useStockStore } from '@/stores/stock'
import RegisterStockModal from '@/components/management-menu/RegisterStockModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'

const stockStore = useStockStore()

onMounted(() => {
  stockStore.fetchStock()
})

const headers = [
  { name: 'Ingrediente', value: 'ingredient' },
  { name: 'Quantidade', value: 'quantity' },
  { name: 'Lote', value: 'batch' },
  { name: 'Fornecedor', value: 'supplier' },
  { name: 'Un. de medida (lote)', value: 'unitOfMeasure' },
  { name: 'Preço (lote)', value: 'batchPrice' },
  { name: 'Validade', value: 'Expirationdate' }
]
</script>

<template>
  <div class="w-full p-8">
    <SectionTitle title="Gerenciamento de estoque" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="Registrar estoque" @click="stockStore.openCreateModal()" />
        <NewProductBtn title="+ Novo ingrediente" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="stockStore.stockItems" />

    <div v-if="stockStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterStockModal @submit="stockStore.createStockItem(stockStore.newItem)" title="Registrar estoque" btn-name="Cadastrar" class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="stockStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="stockStore.deleteStockItem(stockStore.itemToDelete)"
                          @cancel="stockStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>

<style scoped></style>
