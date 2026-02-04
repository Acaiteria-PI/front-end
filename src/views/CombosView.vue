<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import ComboCard from '@/components/management-menu/combos-section/ComboCard.vue'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'
import { onMounted } from 'vue'
import { useComboStore } from '@/stores/combo.js'
import { useModalStore } from '@/stores/modal.js'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import RegisterComboModal from '@/components/management-menu/combos-section/RegisterComboModal.vue'

const comboStore = useComboStore()

const loadingStore = useLoading()
const modalStore = useModalStore()

onMounted(async () => {
  if (comboStore.combos.length > 0) return
  try {
    loadingStore.isLoading = true
    await comboStore.fetchCombos()
  } catch (error) {
    console.error('Error fetching combos:', error)
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <main class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Combos" />
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SearchBar />
      <NewProductBtn title="+ Novo combo" @click="modalStore.openCreateModal('create')" />
    </section>
    <section v-if="comboStore.combos.length > 0" class="w-full flex flex-wrap gap-6 mt-8">
      <ComboCard :product="combo" v-for="combo in comboStore.combos"
                    :key="combo.id" />
    </section>
    <div v-else class="w-full h-64 flex flex-col items-center justify-center mt-8">
      <p class="text-gray-500 text-lg">Nenhum combo encontrado.</p>
    </div>

    <section v-else class="w-full h-100 flex flex-col items-center justify-center mt-8 rounded-lg">
      <p class="text-gray-600">Nenhum combo cadastrado.</p>
    </section>

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterComboModal
        @create-combo="comboStore.createCombo(comboStore.newCombo)"
        @edit-combo="comboStore.updateCombo()"
        :mode="modalStore.modalMode"
        :model="modalStore.modalMode === 'create' ? comboStore.newCombo : modalStore.editingItem"
        :title="modalStore.modalMode === 'create' ? 'Cadastrar combo' : 'Editar combo'"
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-200" />
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
