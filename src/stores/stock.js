import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const loadingStore = useLoading()
const modalStore = useModalStore()
const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {
    const stockItems = ref([])
    const newItem = ref({
      id: null,
      ingredient: null,
      quantity: null,
      batch: '',
      expiration_date: new Date().toISOString().split('T')[0],
      supplier: '',
      batch_price: null,
      unit_of_measure: ''
    })

    const fetchStock = async () => {
      loadingStore.isLoading = true
      const data = await stockApi.fetchStock()
      stockItems.value = Array.isArray(data.results) ? [...data.results] : [...data]
      loadingStore.isLoading = false
    }

    const createStockItem = async (item) => {
      try {
        loadingStore.isLoading = true
        const created = await stockApi.createStockItem(item)
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
        modalStore.closeCreateModal()
        await fetchStock()
        loadingStore.isLoading = false
      } catch (error) {
        console.error('Error creating stock item:', error)
        loadingStore.isLoading = false
      }
    }

    const updateStockItem = async () => {
      try {
        loadingStore.isLoading = true

        await stockApi.updateStockItem(modalStore.editingItem)

        await fetchStock()
        modalStore.closeCreateModal()
        loadingStore.isLoading = false

      } catch (error) {
        console.error('Error updating stock item:', error)
        loadingStore.isLoading = false
      }
    }

    const deleteStockItem = async (id) => {
      try {
        loadingStore.isLoading = true

        await stockApi.deleteStockItem(id)
        stockItems.value = stockItems.value.filter(item => item.id !== id)

        modalStore.closeConfirmDeleteModal()
        loadingStore.isLoading = false
      } catch (error) {
        console.error('Error while deleting stock item', id)
        loadingStore.isLoading = false
      }
    }


    return {
      stockItems,
      fetchStock,
      createStockItem,
      newItem,
      deleteStockItem,
      updateStockItem
    }
  }
)
