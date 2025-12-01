import API from '@/services/axios'

export default class classOrderItemApi {
  async fetchOrderItems() {
    const { data } = await API.get('api/order-items/')
    return data
  }

  async createOrderItem(orderItem) {
    const { data } = await API.post('api/order-items/', orderItem)
    return data
  }

  async updateOrderItem(orderItem) {
    const { data } = await API.put(`api/order-items/${order.id}/`, orderItem)
    return data
  }

  async deleteOrderItem(id) {
    await API.delete(`api/order-items/${id}/`)
  }
}
