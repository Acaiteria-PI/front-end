import API from '@/services/axios'

export default class CustomCupApi {
  async fetchCustomCups() {
    const { data } =  await API.get('api/custom-cups/')
    return data
  }
  async createCustomCup(customCup) {
    const { data } = await API.post('api/custom-cups/', customCup)
    return data
  }
  async updateCustomCup(customCup) {
    const { data } = await API.put(`api/custom-cups/${customCup.id}/`, customCup)
    return data
  }
  async deleteCustomCup(id) {
    await API.delete(`api/custom-cups/${id}/`)
  }
}
