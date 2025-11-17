<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import RegisterRecipientModal from '@/components/management-menu/RegisterRecipientModal.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useRecipientStore } from '@/stores/recipient.js'
import { useModalStore } from '@/stores/modal.js'
import { useLoading } from '@/stores/loading.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const recipientStore = useRecipientStore()
const modalStore = useModalStore()
const loadingStore = useLoading()

onMounted(() => {
  recipientStore.fetchRecipients()
})

const headers = [
  { name: 'Título', value: 'title' },
  { name: 'Quantidade (ml)', value: 'quantity_ml' },
  { name: 'Preço', value: 'price' },
  { name: 'Quantidade em estoque', value: 'stock' },
  { name: 'Conteúdo', value: 'content' }
]
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="w-full p-8">
    <SectionTitle title="Gerenciamento de recipientes" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="+ Novo recipiente" @click="modalStore.openCreateModal('create')" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="recipientStore.recipients" />

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterRecipientModal
        @create-recipient="recipientStore.createRecipient(recipientStore.newRecipient)"
        @edit-recipient="recipientStore.updateRecipient()"
        :mode="modalStore.modalMode"
        :model="modalStore.modalMode === 'create' ? recipientStore.newRecipient : modalStore.editingItem"
        :title="modalStore.modalMode === 'create' ? 'Cadastrar Recipiente' : 'Editar Recipiente'"
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="recipientStore.deleteRecipient(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>
