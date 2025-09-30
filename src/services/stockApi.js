import API from '@/services/axios'

export default class StockApi {
  async fetchStock() {
    const { data } = await API.get('api/stock/')
    return data
  }
  async createStockItem(stockItem) {
    const { data } = await API.post('api/stock/', stockItem)
    return data
  }
  async updateStockItem(stockItem){
    const { data } = await API.put(`api/stock/${stockItem.id}/`, stockItem)
    return data
  }
  async deleteStockItem(id) {
    const { data } = API.delete(`api/stock/${id}/`)
  }
}
