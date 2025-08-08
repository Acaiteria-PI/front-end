import { useIngredientStore } from '@/stores/ingredient'

export function useIngredient() {
  const store = useIngredientStore()

  const ingredients = store.ingredients

  const fetchIngredients = async () => {
    await store.fetchIngredients
  }

  return {
    fetchIngredients,
    ingredients,
  }
}
