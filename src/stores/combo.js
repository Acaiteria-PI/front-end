import { defineStore } from 'pinia'
import { ref } from 'vue'
import ComboApi from '@/services/comboApi.js'
import { useLoading } from '@/stores/loading.js'
import { useModalStore } from '@/stores/modal.js'

const comboApi = new ComboApi()

export const useComboStore = defineStore('combo', () => {
  const loadingStore = useLoading()
  const modalStore = useModalStore()
  
  const combos = ref([])
  const newCombo = ref({
    id: null,
    name: '',
    price: null,
    final_cup: []
  })

  const getFinalCupsNames = (combo) => {
    const finalCupsNames = []
    for (const finalCup of combo.final_cup_data) {
      finalCupsNames.push(finalCup.name)
    }
    return finalCupsNames.join(', ')
  }

  const fetchCombos = async () => {
    loadingStore.isLoading = true
    const data = await comboApi.fetchCombos()
    combos.value = Array.isArray(data.results) ? [...data.results] : [...data]
    loadingStore.isLoading = false
  }

  const createCombo = async (combo) => {
    try {

      loadingStore.isLoading = true
      const created = await comboApi.createCombo(combo)
      combos.value.push(created)

      newCombo.value = {
        id: null,
        name: '',
        price: null,
        final_cup: null
      }
      await fetchCombos()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (error) {
      console.error('Error creating combo:', error)
      loadingStore.isLoading = false
    }
  }

  const updateCombo = async () => {
    try {
      loadingStore.isLoading = true
      await comboApi.updateCombo(modalStore.editingItem)

      await fetchCombos()
      modalStore.closeCreateModal()
      loadingStore.isLoading = false
    } catch (error) {
      console.error('Error updating combo:', error)
      loadingStore.isLoading = false
    }
  }

  const deleteCombo = async (id) => {
    try {
      loadingStore.isLoading = true

      await comboApi.deleteCombo(id)
      combos.value = combos.value.filter(item => item.id !== id)

      modalStore.closeConfirmDeleteModal()
      loadingStore.isLoading = false
    } catch (error) {
      console.log('Error deleting combo:', error)
      loadingStore.isLoading = false
    }
  }

  return { newCombo, combos, fetchCombos, createCombo, updateCombo, deleteCombo, getFinalCupsNames }
})
