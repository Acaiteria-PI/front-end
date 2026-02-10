import API from '@/services/axios'

export default class SupplierApi {
  async fetchSuppliers() {
    const { data } = await API.get('api/suppliers/')
    return data
  }

  async createSupplier(supplier) {
    const { data } = await API.post('api/suppliers/', supplier)
    return data
  }

  async updateSupplier(supplier) {
    const { data } = await API.put(`api/suppliers/${supplier.id}/`, supplier)
    return data
  }

  async deleteSupplier(id) {
    await API.delete(`api/suppliers/${id}/`)
  }
}
