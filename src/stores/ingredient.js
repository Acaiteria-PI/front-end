import { defineStore } from 'pinia'
import { ref } from 'vue'
import IngredientApi from '@/services/ingredientApi'

const ingredientApi = new IngredientApi()

export const useIngredientStore = defineStore('ingredient', () => {

  const ingredients = ref([])
  const isModalOpen = ref(false)

  const fetchIngredients = async () => {
    const data = await ingredientApi.fetchIngredients()
    ingredients.value = data.results ?? data
  }

  const openModal = (() => {
    isModalOpen.value = true
  })

  const closeModal = (() => {
    isModalOpen.value = false
  })

  return {
    ingredients, fetchIngredients, isModalOpen, openModal, closeModal
  }
})
