import { defineStore } from 'pinia'
import { ref } from 'vue'
import ContactApi from '@/services/contactApi'

const contactApi = new ContactApi()

export const useContactStore = defineStore('contact', () => {
  const contacts = ref([])
  const newContact = ref({
    id: null,
    business_email: '',
    financial_email: '',
    phone_number: '',
    whatsapp_number: '',
  })

  const fetchContacts = async () => {
    const data = await contactApi.fetchContacts()
    contacts.value = Array.isArray(data.results) ? [...data.results] : [...data]
  }

  const createContact = async (contact) => {
    try {
      const created = await contactApi.createContact(contact)
      contacts.value.push(created)
      newContact.value = {
        id: null,
        business_email: '',
        financial_email: '',
        phone_number: '',
        whatsapp_number: '',
      }
      await fetchContacts()
      return created
    } catch (error) {
      console.error('Error during contacts fetching ', error)
    }
  }

  const updateContact = async (contact) => {
    try {
      await contactApi.updateContact(contact)
      await fetchContacts()
    } catch (error) {
      console.error('Error during contact update ', error)
    }
  }

  const deleteContact = async (contactId) => {
    try {
      await contactApi.deleteContact(contactId)
      contacts.value = contacts.value.filter(contact => contact.id !== contactId)
      await fetchContacts()
    } catch (error) {
      console.error('Error during contact deletion ', error)
    }
  }

  return { contacts, newContact, fetchContacts, createContact, updateContact, deleteContact }
})
