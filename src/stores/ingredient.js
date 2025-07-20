import { defineStore } from 'pinia'
import { reactive } from 'vue'
import IngredientApi from '@/services/ingredientApi'

const ingredientApi = new IngredientApi()

export const useIngredientStore = defineStore('ingredient', () => {
  const ingredients = reactive([])

  const fetchIngredients = async () => {
    const data = await ingredientApi.fetchIngredients()
    ingredients = data.results
  }

  return {
    ingredients, fetchIngredients
  }
})
