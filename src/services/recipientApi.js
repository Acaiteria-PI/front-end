import API from '@/services/axios'

export default class recipientApi {
  async fetchRecipients() {
    const { data } = await API.get('api/recipients/')
    return data
  }

  async createRecipient(recipient) {
    const { data } = await API.post('api/recipients/', recipient)
    return data
  }

  async updateRecipient(recipient) {
    const { data } = await API.put(`api/recipients/${recipient.id}/`, recipient)
    return data
  }

  async deleteRecipient(id) {
    await API.delete(`api/recipients/${id}/`)
  }
}
