import api from '@/services/axios'

export default class IngredientApi {
    async fetchIngredients() {
        const { data } = await api.get('ingredients/')
        return data
    }
    async createIngredient(ingredient) {
        const { data } = await api.post('ingredients/', ingredient)
        return data
    }
    async updateIngredient(ingredient) {
        const { data } = await api.put(`ingredients/${ingredient.id}/`, ingredient)
        return data.results
    }
    async deleteIngredient(id) {
        await api.delete(`ingredients/${id}/`)
    }
}