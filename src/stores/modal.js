import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const editingItem = ref()
  const itemToDelete = ref()
  const createModal = ref(false)
  const confirmDeleteModal = ref(false)
  const modalMode = ref()
  const modalContext = ref('')

  const openCreateModal = (mode, item) => {
    modalMode.value = mode || 'create'
    if (modalMode.value === 'edit') editingItem.value = item
    createModal.value = true
  }

  const closeCreateModal = () => {
    createModal.value = false
  }

  const openConfirmDeleteModal = (id, context) => {
    itemToDelete.value = id
    modalContext.value = context
    confirmDeleteModal.value = true
  }

  const closeConfirmDeleteModal = () => {
    confirmDeleteModal.value = false
    modalContext.value = ''
  }

watch(
  () => [createModal.value, confirmDeleteModal.value],
  ([m1, m2]) => {
    const anyOpen = m1 || m2
    document.body.style.overflow = anyOpen ? 'hidden' : 'auto'
  }
)

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
    modalContext
  }
})
