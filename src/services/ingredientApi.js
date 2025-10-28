import API from '@/services/axios'

export default class IngredientApi {
  async fetchIngredients() {
    const { data } = await API.get('api/ingredients/')
    return data
  }

  async createIngredient(ingredient) {
    const { data } = await API.post('api/ingredients/', ingredient)
    return data
  }

  async updateIngredient(ingredient) {
    const { data } = await API.put(`api/ingredients/${ingredient.id}/`, ingredient)
    return data
  }

  async deleteIngredient(id) {
    await API.delete(`api/ingredients/${id}/`)
  }
}
