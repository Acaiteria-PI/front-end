import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'

const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {

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
      stockItems.value = data.results ?? data
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

        await fetchStock()
      } catch (error) {
        console.error('Error creating stock item:', error)
      }
    }

    return {
      stockItems, fetchStock, createStockItem, newItem
    }
  }
)
