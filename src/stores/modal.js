import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const editingItem = ref()
  const itemToDelete = ref()
  const createModal = ref(false)
  const confirmDeleteModal = ref(false)
  const modalMode = ref()

  const openCreateModal = (mode, item) => {
    modalMode.value = mode || 'create'
    if (modalMode.value === 'edit') editingItem.value = item
    createModal.value = true
  }

  const closeCreateModal = () => {
    createModal.value = false
  }

  const openConfirmDeleteModal = (id) => {
    itemToDelete.value = id
    confirmDeleteModal.value = true
  }

  const closeConfirmDeleteModal = () => {
    confirmDeleteModal.value = false
  }

  return {
    editingItem,
    itemToDelete,
    createModal,
    confirmDeleteModal,
    openCreateModal,
    closeCreateModal,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    modalMode,
  }
})
