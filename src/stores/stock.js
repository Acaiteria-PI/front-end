import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'

const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {

    const createModal = ref(false)
    const confirmDeleteModal = ref(false)
    const itemToDelete = ref()
    const editingItem = ref()
    const modalMode = ref()
    const stockItems = ref([])
    const newItem = ref({
      id: null,
      ingredient: null,
      quantity: 0,
      batch: '',
      expiration_date: '',
      supplier: '',
      batch_price: 0,
      unit_of_measure: ''
    })

    const fetchStock = async () => {
      const data = await stockApi.fetchStock()
      stockItems.value = Array.isArray(data.results) ? [...data.results] : [...data]
    }

    const createStockItem = async (item) => {
      try {
        const created = await stockApi.createStockItem(item)
        await console.log('Creating stock item:', created, 'api response:', await stockApi.fetchStock())
        stockItems.value.push(created)

        newItem.value = {
          id: null,
          ingredient: null,
          quantity: 0,
          batch: '',
          expiration_date: '',
          supplier: '',
          batch_price: 0,
          unit_of_measure: ''
        }

        closeCreateModal(createModal.value)
        await fetchStock()
      } catch (error) {
        console.error('Error creating stock item:', error)
      }
    }

    const updateStockItem = async (itemId) => {
      try {
        console.log('Updating item', itemId)

        const currentEditing = stockItems.value.find((item) => item.id === itemId)
        console.log(currentEditing)

        await stockApi.updateStockItem(currentEditing)

        await fetchStock()

        closeCreateModal()

      } catch (error) {
        console.error('Error updating stock item:', error)
      }
    }

    const deleteStockItem = async (id) => {
      try {
        await stockApi.deleteStockItem(id)
        stockItems.value = stockItems.value.filter(item => item.id !== id)
        closeConfirmDeleteModal()
      } catch (error) {
        console.error('Error while deleting stock item', id)
      }
    }

    const openCreateModal = (mode, item) => {
      modalMode.value = mode || 'create'
      if (modalMode.value === 'edit') editingItem.value = item
      createModal.value = true
    }

    const closeCreateModal = () => {
      createModal.value = false
    }

    const openConfirmDeleteModal = (id) => {
      itemToDelete.value = id
      confirmDeleteModal.value = true
    }

    const closeConfirmDeleteModal = () => {
      confirmDeleteModal.value = false
    }


    return {
      stockItems,
      fetchStock,
      createStockItem,
      newItem,
      deleteStockItem,
      createModal,
      confirmDeleteModal,
      openCreateModal,
      closeCreateModal,
      openConfirmDeleteModal,
      closeConfirmDeleteModal,
      itemToDelete,
      updateStockItem,
      editingItem,
      modalMode
    }
  }
)
