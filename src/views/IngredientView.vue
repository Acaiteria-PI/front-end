<script setup>
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import RegisterStockModal from '@/components/management-menu/RegisterStockModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useIngredientStore } from '@/stores/ingredient.js'
import { useStockStore } from '@/stores/stock.js'
import { onMounted } from 'vue'

const stockStore = useStockStore()
const ingredientStore = useIngredientStore()

onMounted(() => {
  ingredientStore.fetchIngredients()
  stockStore.fetchStock()
})

const headers = [
  { name: 'Nome', value: 'name' },
  { name: 'Porção', value: 'portion' },
  { name: 'Preço', value: 'price' },
  { name: 'Un. de medida (porção)', value: 'unit_of_measure' },
]
</script>

<template>
  <div class="w-full p-8">
    <SectionTitle title="Gerenciamento de ingredientes" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="+ Novo ingrediente" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="ingredientStore.ingredients" />

    <div v-if="stockStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterStockModal @create-stock="stockStore.createStockItem(stockStore.newItem)"
                          @edit-stock="stockStore.updateStockItem(stockStore.editingItem.id)"
                          :mode="stockStore.modalMode"
                          :model="stockStore.modalMode === 'create' ? stockStore.newItem : stockStore.editingItem"
                          :title="stockStore.modalMode === 'create' ? 'Registrar estoque' : 'Editar item'"
                          :btn-name="stockStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
                          class="absolute inset-0 m-auto z-50" />
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
