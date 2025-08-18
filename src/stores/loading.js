import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoading = defineStore('loading', () => {
  const isLoading = ref(false)
  const fullPage = ref(true)

  return { isLoading, fullPage }
})
