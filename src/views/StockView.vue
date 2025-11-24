<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import RegisterStockModal from '@/components/management-menu/RegisterStockModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import 'vue-loading-overlay/dist/css/index.css'
import Loading from 'vue-loading-overlay'
import { useStockStore } from '@/stores/stock'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const stockStore = useStockStore()
const loadingStore = useLoading()
const modalStore = useModalStore()

onMounted(() => {
  stockStore.fetchStock()
})

const headers = [
  { name: 'Ingrediente', value: 'ingredient_data' },
  { name: 'Quantidade', value: 'quantity' },
  { name: 'Lote', value: 'batch' },
  { name: 'Fornecedor', value: 'supplier' },
  { name: 'Un. de medida (lote)', value: 'unit_of_measure' },
  { name: 'Preço (lote)', value: 'batch_price' },
  { name: 'Validade', value: 'expiration_date' }
]
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Gerenciamento de estoque" />
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="Registrar estoque" @click="modalStore.openCreateModal('create')" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="stockStore.stockItems" />

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterStockModal @create-stock="stockStore.createStockItem(stockStore.newItem)"
                          @edit-stock="stockStore.updateStockItem()"
                          :mode="modalStore.modalMode"
                          :model="modalStore.modalMode === 'create' ? stockStore.newItem : modalStore.editingItem"
                          :title="modalStore.modalMode === 'create' ? 'Registrar estoque' : 'Editar item'"
                          :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="stockStore.deleteStockItem(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>

<style scoped></style>
