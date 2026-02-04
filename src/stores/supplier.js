import { defineStore } from 'pinia'
import { ref } from 'vue'
import SupplierApi from '@/services/supplierApi.js'
import { useModalStore } from '@/stores/modal.js'

const supplierApi = new SupplierApi()

export const useSupplierStore = defineStore('supplier', () => {
  const modalStore = useModalStore()

  const suppliers = ref([])
  const newSupplier = ref({
    id: null,
    legal_name: '',
    name: '',
    document: '',
    type: '',
    contact: null,
    address: null,
    contact_data: null,
    address_data: null,
  })

  const fetchSuppliers = async () => {
    const data = await supplierApi.fetchSuppliers()
    suppliers.value = Array.isArray(data.results) ? [...data.results] : [...data]
  }

  const createSupplier = async (supplier) => {
    try {
      const created = await supplierApi.createSupplier(supplier)
      suppliers.value.push(created)

      newSupplier.value = {
        id: null,
        legal_name: '',
        name: '',
        document: '',
        type: '',
        contact: null,
        address: null,
        contact_data: null,
        address_data: null,
      }
    } catch (err) {
      console.error('Error creating supplier', err)
    }
  }

  const updateSupplier = async (supplier = modalStore.editingItem) => {
    try {
      await supplierApi.updateSupplier(supplier)

      await fetchSuppliers()
      modalStore.closeCreateModal()
    } catch (err) {
      console.error('Error updating supplier: ', err)
    }
  }

  const deleteSupplier = async (id) => {
    try {
      await supplierApi.deleteSupplier(id)
      suppliers.value = suppliers.value.filter((supplier) => supplier.id !== id)

      modalStore.closeConfirmDeleteModal()
    } catch (err) {
      console.error('Error deleting supplier:', err)
    }
  }

  return {
    suppliers,
    newSupplier,
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  }
})
