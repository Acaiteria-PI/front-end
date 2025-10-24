import API from '@/services/axios'

export default class FinalCupApi {
    async fetchFinalCups() {
      const { data } =  await API.get('api/final-cups/')
      return data
    }
    async createFinalCup(product) {
      const { data } = await API.post('api/final-cups/', product)
      return data
    }
    async updateFinalCup(product) {
      const { data } = await API.put(`api/final-cups/${product.id}/`, product)
      return data
    }
    async deleteFinalCup(id) {
      await API.delete(`api/final-cups/${id}/`)
    }
}
