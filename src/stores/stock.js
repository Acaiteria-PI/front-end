import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'

const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {

    const createModal = ref(false)
    const confirmDeleteModal = ref(false)
    const itemToDelete = ref()
    const stockItems = ref([])
    const newItem = ref({
      id: null,
      ingredient: '',
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
      console.log('Creating stock item:', item)
      try {
        newItem.value = await stockApi.createStockItem(item)
        stockItems.value.push(newItem.value)

        newItem.value = {
          id: null,
          ingredient: '',
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

    const deleteStockItem = async (id) => {
      try {
        await stockApi.deleteStockItem(id)
        stockItems.value = stockItems.value.filter(item => item.id !== id)
        closeConfirmDeleteModal()
      } catch (error) {
        console.error('Error while deleting stock item', id)
      }
    }

    const openCreateModal = () => {
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
    }
  }
)
