import { useFinalCupStore } from '@/stores/finalCup.js'
import { ref } from 'vue'

export function useRelationErrorHandler() {
  const { fetchFinalCups, finalCups } = useFinalCupStore()

  async function handleDeleteRelationError(entityType, entityId) {
    const errorMessage = ref('')
    await fetchFinalCups()
    const related = finalCups.filter(cup => cup[entityType] === entityId)

    if (related.length > 0) {
      const relatedNames = related.map(cup => cup.name)
      console.error(`Cannot delete ${entityType}: used by FinalCups -> ${relatedNames.join(', ')}`)
      errorMessage.value = `Item não pode ser deletado, pois é usado nos Copos Prontos ${relatedNames}`
    }
    console.log(entityType, entityId, related, finalCups)
    return errorMessage
  }

  return { handleDeleteRelationError }
}
