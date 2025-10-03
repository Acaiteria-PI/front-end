import { defineStore } from 'pinia'
import { ref } from 'vue'
import IngredientApi from '@/services/ingredientApi'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const loadingStore = useLoading()
const modalStore = useModalStore()
const ingredientApi = new IngredientApi()

export const useIngredientStore = defineStore('ingredient', () => {

  const ingredients = ref([])
  const newIngredient = ref({
    id: null,
    name: '',
    portion: '',
    price: null,
    unit_of_measure: ''
  })

  const fetchIngredients = async () => {
    loadingStore.isLoading = true
    const data = await ingredientApi.fetchIngredients()
    ingredients.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createIngredient = async (ingredient) => {
    try {
      loadingStore.isLoading = true
      const created = await ingredientApi.createIngredient(ingredient)
      ingredients.value.push(created)

      newIngredient.value = {
        id: null,
        name: '',
        price: null,
        unit_of_measure: ''
      }

      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error creating ingredient', err)
      loadingStore.isLoading = false
    }
  }

  const deleteIngredient = async (id) => {
    try {
      loadingStore.isLoading = true

      await ingredientApi.deleteIngredient(id)
      ingredients.value = ingredients.value.filter(ingredient => ingredient.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error deleting ingredient:', err)
      loadingStore.isLoading = false
    }
  }

  return {
    ingredients, newIngredient, fetchIngredients, createIngredient, deleteIngredient
  }
})
