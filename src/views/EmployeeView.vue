<script setup>
import { onMounted } from 'vue'
import ProductsTable from '@/components/management-menu/ProductsTable.vue'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import ConfirmDeleteModal from '@/components/management-menu/ConfirmDeleteModal.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import { useEmployeeStore } from '@/stores/employee.js'
import { useModalStore } from '@/stores/modal.js'
import { useLoading } from '@/stores/loading.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import RegisterEmployeeModal from '@/components/management-menu/RegisterEmployeeModal.vue'

const employeeStore = useEmployeeStore()
const modalStore = useModalStore()
const loadingStore = useLoading()

onMounted(() => {
  employeeStore.fetchEmployees()

})

const headers = [
  { name: 'Nome', value: 'name' },
  { name: 'Email', value: 'email' },
  { name: 'N° de registro', value: 'registration' },
  { name: 'Estabelecimento', value: 'establishment_data' },
  { name: 'Administrador', value: 'is_management' }
]
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <div class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Gerenciamento de funcionários" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <div class="flex flex-row gap-4">
        <NewProductBtn title="+ Novo funcionário" @click="modalStore.openCreateModal('create')" />
      </div>
    </section>
    <ProductsTable class="w-full mt-8" :headers="headers" :products="employeeStore.employees" />

    <div v-if="modalStore.createModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <RegisterEmployeeModal
        @create-employee="employeeStore.createEmployee(employeeStore.newEmployee)"
        @edit-employee="employeeStore.updateEmployee()"
        :mode="modalStore.modalMode"
        :model="modalStore.modalMode === 'create' ? employeeStore.newEmployee : modalStore.editingItem"
        :title="modalStore.modalMode === 'create' ? 'Cadastrar funcionário' : 'Editar funcionário'"
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div v-if="modalStore.confirmDeleteModal === true"
         class="fixed inset-0 flex items-center justify-center">
      <ConfirmDeleteModal @confirm="employeeStore.deleteEmployee(modalStore.itemToDelete)"
                          @cancel="modalStore.closeConfirmDeleteModal"
                          class="absolute inset-0 m-auto z-50" />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </div>
</template>
