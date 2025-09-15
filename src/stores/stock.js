import { defineStore } from 'pinia'
import { ref } from 'vue'
import StockApi from '@/services/stockApi.js'

const stockApi = new StockApi()

export const useStockStore = defineStore('stock', () => {

  const stockItems = ref([])

  const fetchStock = async () => {
    const data = await stockApi.fetchStock()
    stockItems.value = data.results ?? data
  }

  return {
    stockItems, fetchStock
  }
})
