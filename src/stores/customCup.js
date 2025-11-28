import { defineStore } from 'pinia'
import { ref } from 'vue'
import CustomCupApi from "@/services/customCupApi.js";
import { useLoading } from '@/stores/loading.js'
import {useModalStore} from "@/stores/modal.js";

const loadingStore = useLoading()
const modalStore = useModalStore()
const customCupApi = new CustomCupApi()

export const useCustomCupStore = defineStore('customCup', () => {

  const customCups = ref([])
  const newCustomCup = ref({
    id: null,
    recipient: null,
    recipient_data: null,
    ingredient: [],
    ingredient_data: null,
    price: null,
  })

  const fetchCustomCups = async () => {
    loadingStore.isLoading = true
    const data = await customCupApi.fetchCustomCups()
    customCups.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createCustomCup = async (customCup) => {
    try {
      loadingStore.isLoading = true
      const created = await customCupApi.createCustomCup(customCup)
      customCups.value.push(created)

      newCustomCup.value = {
        id: null,
        recipient: null,
        recipient_data: null,
        ingredient: [],
        ingredient_data: null,
        price: null,
      }

      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error creating customCup', err)
      loadingStore.isLoading = false
    }
  }

  const updateCustomCup = async () => {
    try {
      loadingStore.isLoading = true

      await customCupApi.updateCustomCup(modalStore.editingItem)

      await fetchCustomCups()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false

    } catch (err) {
      console.error('Error updating customCup: ', err)
      loadingStore.isLoading = false
    }
  }

  const deleteCustomCup = async (id) => {
    try {
      loadingStore.isLoading = true

      await customCupApi.deleteCustomCup(id)
      customCups.value = customCups.value.filter(customCup => customCup.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (err) {
      console.error('Error deleting customCup:', err)
      loadingStore.isLoading = false
    }
  }

  return {
    customCups, newCustomCup, fetchCustomCups, createCustomCup, updateCustomCup, deleteCustomCup
  }
})
