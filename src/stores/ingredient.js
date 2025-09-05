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

  return {
    ingredients, fetchIngredients, isModalOpen, openModal
  }
})
