import API from '@/services/axios'

export default class AddressApi {
  async fetchAddresses() {
    const { data } = await API.get('api/addresses/')
    return data
  }

  async createAddress(address) {
    const { data } = await API.post('api/addresses/', address)
    return data
  }

  async updateAddress(address) {
    const { data } = await API.put(`api/addresses/${address.id}/`, address)
    return data
  }

  async deleteAddress(id) {
    await API.delete(`api/addresses/${id}/`)
  }
}
