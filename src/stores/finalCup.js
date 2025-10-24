import { defineStore } from 'pinia'
import { ref } from 'vue'
import FinalCupApi from '@/services/finalCupApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const finalCupApi = new FinalCupApi()
const loadingStore = useLoading()
const modalStore = useModalStore()

export const useFinalCupStore = defineStore('product', () => {
  const finalCups = ref([])
  const newFinalCup = ref({
    id: null,
    name: '',
    price: null,
    recipient: null,
    ingredient: []
  })

  const getIngredientsNames = (product) => {
    const ingredientsNames = []
    for (const ingredient of product.ingredient_data) {
      ingredientsNames.push(ingredient.name)
    }
    return ingredientsNames.join(', ')
  }

  const fetchFinalCups = async () => {
    loadingStore.isLoading = true
    const data = await finalCupApi.fetchFinalCups()
    finalCups.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createFinalCup = async (finalCup) => {
    try {

      loadingStore.isLoading = true
      const created = await finalCupApi.createFinalCup(finalCup)
      finalCups.value.push(created)

      newFinalCup.value = {
        id: null,
        name: '',
        price: null,
        recipient: null,
        ingredient: null
      }
      await fetchFinalCups()
      loadingStore.isLoading = false
    } catch (error) {
      console.error('Error creating final cup:', error)
      loadingStore.isLoading = false
    }
  }

  const updateFinalCup = async () => {
    try {
      loadingStore.isLoading = true
      await finalCupApi.updateFinalCup(modalStore.editingItem)

      await fetchFinalCups()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (error) {
      console.error('Error updating final cup:', error)
      loadingStore.isLoading = false
    }
  }

  const deleteFinalCup = async (id) => {
    try {
      loadingStore.isLoading = true

      await finalCupApi.deleteFinalCup(id)
      finalCups.value = finalCups.value.filter(item => item.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (error) {
      console.log('Error deleting final cup:', error)
      loadingStore.isLoading = false
    }
  }

  return { newFinalCup, finalCups, fetchFinalCups, createFinalCup, updateFinalCup, deleteFinalCup, getIngredientsNames }
})
