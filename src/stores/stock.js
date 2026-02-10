import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'
import { mediumStockThresholdGrams } from '@/constants/lowStockTreshold'

const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {
  const loadingStore = useLoading()
  const modalStore = useModalStore()
  const stockItems = ref([])
  const lowStockItems = ref([])
  const newItem = ref({
    id: null,
    ingredient: null,
    quantity: null,
    batch: '',
    expiration_date: new Date().toISOString().split('T')[0],
    supplier: '',
    batch_price: 0,
    unit_of_measure: '',
  })

  const fetchStock = async () => {
    try {
      const data = await stockApi.fetchStock()
      stockItems.value = Array.isArray(data.results) ? [...data.results] : [...data] //Verifica se há data.results ou só data no json e força a ciação de um novo array na memória para forçar a reatividade (stockItems.value = data.results tava dando problema na atualização da ui)
    } catch (error) {
      console.error('Error fetching stock items:', error)
    }
  }

  const fetchLowStock = async () => {
    try {
      const data = await stockApi.fetchLowStock()
      lowStockItems.value = Array.isArray(data.results) ? [...data.results] : [...data]
    } catch (error) {
      console.error('Error fetching low stock items:', error)
    }
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
        unit_of_measure: '',
      }
      
      if (created.quantity < mediumStockThresholdGrams) {
        console.log('if working')
        await fetchLowStock()
        await fetchStock()
      } else {
        console.log('else working')
        await fetchStock()
      }

      modalStore.closeCreateModal()
    } catch (error) {
      console.error('Error creating stock item:', error)
    } finally {
      loadingStore.isLoading = false
    }
  }

  const updateStockItem = async () => {
    try {
      loadingStore.isLoading = true
      await stockApi.updateStockItem(modalStore.editingItem)

      if (modalStore.editingItem.quantity < mediumStockThresholdGrams) {
        await fetchLowStock()
        await fetchStock()
      } else {
        await fetchStock()
      }

      modalStore.closeCreateModal()
    } catch (error) {
      console.error('Error updating stock item:', error)
    } finally {
      loadingStore.isLoading = false
    }
  }

  const deleteStockItem = async (id) => {
    try {
      loadingStore.isLoading = true

      await stockApi.deleteStockItem(id)
      stockItems.value = stockItems.value.filter((item) => item.id !== id)

      modalStore.closeConfirmDeleteModal()
    } catch (error) {
      console.error('Error while deleting stock item', id)
    } finally {
      loadingStore.isLoading = false
    }
  }

  return {
    stockItems,
    lowStockItems,
    fetchStock,
    fetchLowStock,
    createStockItem,
    newItem,
    deleteStockItem,
    updateStockItem,
  }
})
