import API from '@/services/axios'

export default class ContactApi {
  async fetchContacts() {
    const { data } = await API.get('api/contacts/')
    return data
  }

  async createContact(contact) {
    const { data } = await API.post('api/contacts/', contact)
    return data
  }

  async updateContact(contact) {
    const { data } = await API.put(`api/contacts/${contact.id}/`, contact)
    return data
  }

  async deleteContact(id) {
    await API.delete(`api/contacts/${id}/`)
  }
}
