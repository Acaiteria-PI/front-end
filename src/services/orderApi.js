import API from '@/services/axios'

export default class classOrderApi {
  async fetchOrders() {
    const { data } = await API.get('api/orders/')
    return data
  }

  async createOrder(order) {
    const { data } = await API.post('api/orders/', order)
    return data
  }

  async updateOrder(order) {
    const { data } = await API.put(`api/orders/${order.id}/`, order)
    return data
  }

  async deleteOrder(id) {
    await API.delete(`api/orders/${id}/`)
  }
}
