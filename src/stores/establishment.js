import { defineStore } from 'pinia'
import { ref } from 'vue'
import EstablishmentApi from '@/services/establishmentApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const loadingStore = useLoading()
const modalStore = useModalStore()
const establishmentApi = new EstablishmentApi()

export const useEstablishmentStore = defineStore('establishment', () => {

  const establishments = ref([])
  const newEstablishment = ref({
    id: null,
    name: '',
    cnpj: '',
    amount: 0,
  })

  const fetchEstablishments = async () => {
    loadingStore.isLoading = true
    const data = await establishmentApi.fetchEstablishments()
    establishments.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createEstablishment = async (establishment) => {
    try {
      loadingStore.isLoading = true
      const created = await establishmentApi.createEstablishment(establishment)
      establishment.value.push(created)

      newEstablishment.value = {
        id: null,
        name: '',
        cnpj: '',
        amount: 0,
      }

      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error creating establishment', err)
      loadingStore.isLoading = false
    }
  }

  const updateEstablishment = async () => {
    try {
      loadingStore.isLoading = true

      await establishmentApi.updateEstablishment(modalStore.editingItem)

      await fetchEstablishments()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false

    } catch (err) {
      console.error('Error updating establishment: ', err)
      loadingStore.isLoading = false
    }
  }

  const deleteEstablishment = async (id) => {
    try {
      loadingStore.isLoading = true

      await establishmentApi.deleteEstablishment(id)
      establishments.value = establishments.value.filter(establishment => establishment.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error deleting establishment:', err)
      loadingStore.isLoading = false
    }
  }

  return {
    establishments, newEstablishment, fetchEstablishments, createEstablishment, updateEstablishment, deleteEstablishment
  }
})
