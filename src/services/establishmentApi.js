import API from '@/services/axios'

export default class EstablishmentApi {
  async fetchEstablishments() {
    const { data } =  await API.get('api/establishments/')
    return data
  }
  async createEstablishment(establishment) {
    const { data } = await API.post('api/establishments/', establishment)
    return data
  }
  async updateEstablishment(establishment) {
    const { data } = await API.put(`api/establishments/${establishment.id}/`, establishment)
    return data
  }
  async deleteEstablishment(id) {
    await API.delete(`api/establishments/${id}/`)
  }
}
