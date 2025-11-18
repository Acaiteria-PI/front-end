import API from '@/services/axios'

export default class ComboApi {
  async fetchCombos() {
    const { data } =  await API.get('api/combos/')
    return data
  }
  async createCombo(product) {
    const { data } = await API.post('api/combos/', product)
    return data
  }
  async updateCombo(product) {
    const { data } = await API.put(`api/combos/${product.id}/`, product)
    return data
  }
  async deleteCombo(id) {
    await API.delete(`api/combos/${id}/`)
  }
}
