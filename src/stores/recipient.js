import { defineStore } from 'pinia'
import { ref } from 'vue'
import RecipientApi from '@/services/recipientApi'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'
import { useRelationErrorHandler } from '@/composables/useRelationErrorHandler.js'

const { handleDeleteRelationError } = useRelationErrorHandler()
const loadingStore = useLoading()
const modalStore = useModalStore()
const recipientApi = new RecipientApi()

export const useRecipientStore = defineStore('recipient', () => {

  const recipients = ref([])
  const newRecipient = ref({
    id: null,
    title: '',
    quantity: '',
    price: null,
    stock: '',
    content: null
  })

  const fetchRecipients = async () => {
    loadingStore.isLoading = true
    const data = await recipientApi.fetchRecipients()
    recipients.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createRecipient = async (recipient) => {
    try {
      loadingStore.isLoading = true
      const created = await recipientApi.createRecipient(recipient)
      recipients.value.push(created)

      newRecipient.value = {
        id: null,
        name: '',
        price: null,
        unit_of_measure: ''
      }

      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error creating recipient', err)
      loadingStore.isLoading = false
    }
  }

  const updateRecipient = async () => {
    try {
      loadingStore.isLoading = true

      await recipientApi.updateRecipient(modalStore.editingItem)

      await fetchRecipients()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false

    } catch (err) {
      console.error('Error updating recipient: ', err)
      loadingStore.isLoading = false
    }
  }

  const deleteRecipient = async (id) => {
    try {
      loadingStore.isLoading = true
      await recipientApi.deleteRecipient(id)
      recipients.value = recipients.value.filter(recipient => recipient.id !== id)

      await modalStore.closeConfirmDeleteModal()
    } catch (err) {
      await handleDeleteRelationError('recipient', id)
    } finally {
      loadingStore.isLoading = false
    }
  }

  return {
    recipients,
    newRecipient,
    fetchRecipients,
    createRecipient,
    updateRecipient,
    deleteRecipient
  }
})
