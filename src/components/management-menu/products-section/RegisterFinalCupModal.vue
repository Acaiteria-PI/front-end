<script setup>
import { computed, onMounted, reactive } from 'vue'
import { X } from 'lucide-vue-next'
import { useModalStore } from '@/stores/modal.js'
import { useIngredientStore } from '@/stores/ingredient.js'
import { useRecipientStore } from '@/stores/recipient.js'
import MoneyInput from '@/components/MoneyInput.vue'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'

const loadingStore = useLoading()
const recipientStore = useRecipientStore()
const ingredientStore = useIngredientStore()
const modalStore = useModalStore()

defineProps({
  title: { type: String, required: true },
  btnName: { type: String, required: true },
  mode: { type: String, required: true },
  model: { type: Object, required: true },
})

defineEmits(['createFinalCup', 'editFinalCup'])

const fields = reactive([
  {
    id: 'name',
    name: 'Nome',
    placeholder: 'Ex: Açai c/ banana',
    type: 'text',
    cols: '2',
  },
])

const addons = computed(() => {
  return ingredientStore.ingredients.filter((ingredient) => ingredient.is_addon === true)
})

onMounted(async () => {
  const promises = []

  if (ingredientStore.ingredients.length === 0) {
    promises.push(ingredientStore.fetchIngredients())
  }
  if (recipientStore.recipients.length === 0) {
    promises.push(recipientStore.fetchRecipients())
  }
  if (promises.length === 0) return

  try {
    loadingStore.isLoading = true
    await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching data for final cup modal:', error)
  } finally {
    loadingStore.isLoading = false
  }
})
</script>

<template>
  <main
    class="w-100 h-fit bg-white rounded-3xl shadow-xl p-6 pt-8 flex flex-col items-center gap-6 mx-4 relative md:mx-0"
  >
    <h1 class="text-3xl font-bold mb-2 text-center">{{ title }}</h1>
    <div
      class="h-8 w-8 rounded-full hover:bg-neutral-200 flex items-center justify-center absolute top-4 right-4 cursor-pointer"
      @click="modalStore.closeCreateModal"
    >
      <X />
    </div>

    <form
      @submit.prevent="$emit(mode === 'create' ? 'createFinalCup' : 'editFinalCup')"
      class="w-full flex flex-col gap-6"
    >
      <section class="w-full grid grid-cols-1 gap-4">
        <div
          v-for="field in fields"
          :key="field.id"
          class="flex flex-col gap-1 align-center w-full"
          :class="{ 'col-span-2': field.cols === '2', 'col-span-1': field.cols === '1' }"
        >
          <label :for="field.id">{{ field.name }}</label>
          <input
            :id="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="model[field.id]"
            class="border border-neutral-300 rounded-xl p-2 w-full h-12"
          />
        </div>

        <div class="flex flex-col gap-1 align-center w-full col-span-2">
          <label for="price">Preço</label>
          <MoneyInput v-model="model.price" />
        </div>

        <div class="flex flex-col gap-1 col-span-2">
          <label for="recipient">Recipiente</label>
          <select
            v-model="model.recipient"
            name="recipient"
            id="recipient"
            class="border border-neutral-300 rounded-xl p-2 w-full h-12"
          >
            <option
              v-for="recipient in recipientStore.recipients"
              :key="recipient.id"
              :value="recipient.id"
            >
              {{ recipient.title }}
            </option>
          </select>
        </div>

        <section class="gap-1 flex flex-col col-span-2">
          <label for="ingredient">Ingredientes</label>
          <div class="max-h-40 overflow-y-scroll border border-neutral-300 rounded-xl">
            <div v-for="ingredient in addons" :key="ingredient.id">
              <div class="flex justify-between align-center p-4">
                <label :for="ingredient.id">{{ ingredient.name }}</label>
                <input
                  class="w-4 cursor-pointer"
                  v-model="model.ingredient"
                  :value="ingredient.id"
                  type="checkbox"
                />
              </div>
              <div class="px-4">
                <hr class="border-neutral-300" />
              </div>
            </div>
          </div>
        </section>
      </section>
      <button
        type="submit"
        class="w-full h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out"
      >
        {{ btnName }}
      </button>
    </form>
  </main>
</template>
