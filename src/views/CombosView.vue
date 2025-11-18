<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import ComboCard from '@/components/management-menu/products-section/ComboCard.vue'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'
import { onMounted } from 'vue'
import { useComboStore } from '@/stores/combo.js'
import { useModalStore } from '@/stores/modal.js'
import RegisterFinalCupModal
  from '@/components/management-menu/products-section/RegisterFinalCupModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'

const comboStore = useComboStore()

const loadingStore = useLoading()
const modalStore = useModalStore()

onMounted( async() => {
  loadingStore.isLoading = true
  await comboStore.fetchCombos()
  console.log(comboStore.combos)
  loadingStore.isLoading = false
})
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <main class="w-full p-8">
    <SectionTitle title="Combos" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <NewProductBtn title="+ Novo combo" @click="modalStore.openCreateModal('create')" />
    </section>
    <section class="w-full flex flex-wrap gap-6 mt-8">
      <ComboCard :product="combo" v-for="combo in comboStore.combos"
                    :key="combo.id" />
    </section>

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterFinalCupModal
        @create-final-cup="comboStore.createCombo(comboStore.newCombo)"
        @edit-final-cup="comboStore.updateCombo()"
        :mode="modalStore.modalMode"
        :model="modalStore.modalMode === 'create' ? comboStore.newCombo : modalStore.editingItem"
        :title="modalStore.modalMode === 'create' ? 'Cadastrar combo' : 'Editar combo'"
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="comboStore.deleteCombo(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </main>
</template>

<style scoped></style>
