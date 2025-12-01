<script setup>
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import RegisterIngredientModal from '@/components/management-menu/ReisterIngredientModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import {useIngredientStore} from '@/stores/ingredient.js'
import {useModalStore} from '@/stores/modal.js'
import {useLoading} from '@/stores/loading.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const ingredientStore = useIngredientStore()
const modalStore = useModalStore()
const loadingStore = useLoading()

const headers = [
  { name: 'Nome', value: 'name' },
  { name: 'Porção', value: 'portion' },
  { name: 'Preço', value: 'price' },
  { name: 'Un. de medida (porção)', value: 'unit_of_measure' }
]
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Gerenciamento de ingredientes" />
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="+ Novo ingrediente" @click="modalStore.openCreateModal('create')" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="ingredientStore.ingredients" />

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterIngredientModal
        @create-ingredient="ingredientStore.createIngredient(ingredientStore.newIngredient)"
        @edit-ingredient="ingredientStore.updateIngredient()"
        :mode="modalStore.modalMode"
        :model="modalStore.modalMode === 'create' ? ingredientStore.newIngredient : modalStore.editingItem"
        :title="modalStore.modalMode === 'create' ? 'Cadastrar ingrediente' : 'Editar ingrediente'"
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="ingredientStore.deleteIngredient(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>
