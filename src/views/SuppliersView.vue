<script setup>
import { ref, watch, onMounted } from 'vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import SupplierCard from '@/components/management-menu/SupplierCard.vue'
import { useSupplierStore } from '@/stores/supplier.js'
import { useModalStore } from '@/stores/modal.js'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'
import { useRouter } from 'vue-router'

const supplierStore = useSupplierStore()
const modalStore = useModalStore()
const loadingStore = useLoading()
const router = useRouter()

onMounted(async () => {
  loadingStore.isLoading = true
  if (supplierStore.suppliers.length > 0) {
    loadingStore.isLoading = false
    return
  }
  try {
    await supplierStore.fetchSuppliers()
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Gerenciamento de fornecedores" />
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="+ Novo fornecedor" @click="router.push('/management-menu/suppliers/new')" />
      </div>
    </section>
    <section v-if="supplierStore.suppliers.length > 0" class="w-full flex flex-wrap gap-6 mt-8">
      <SupplierCard
        v-for="supplier in supplierStore.suppliers"
        :key="supplier.id"
        :supplier="supplier"
      />
    </section>
    <div v-else class="w-full h-64 flex flex-col items-center justify-center mt-8">
      <p class="text-gray-500 text-lg">Nenhum fornecedor encontrado.</p>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="supplierStore.deleteSupplier(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>
