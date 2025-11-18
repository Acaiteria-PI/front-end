<script setup>
import { onMounted, reactive } from 'vue'
import { X } from 'lucide-vue-next'
import { useFinalCupStore } from '@/stores/finalCup.js'
import { useModalStore } from '@/stores/modal.js'

const finalCupStore = useFinalCupStore()
const modalStore = useModalStore()

defineProps({
  title: { type: String, required: true },
  btnName: { type: String, required: true },
  mode: { type: String, required: true },
  model: { type: Object, required: true }
})

defineEmits(['createCombo', 'editCombo'])

const fields = reactive([
  {
    id: 'name',
    name: 'Nome',
    placeholder: 'Ex: Açai c/ banana e Açaí c/ morango',
    type: 'text',
    cols: '2'
  },
  {
    id: 'price',
    name: 'Preço',
    placeholder: 'R$32,90',
    type: 'text',
    cols: '1'
  }
])

onMounted(() => {
  finalCupStore.fetchFinalCups()
})
</script>

<template>
  <main
    class="w-100 h-fit bg-white rounded-3xl shadow-xl p-6 pt-8 flex flex-col items-center gap-6">
    <h1 class="text-3xl font-bold mb-2 text-center">{{ title }}</h1>
    <div
      class="h-8 w-8 rounded-full hover:bg-neutral-200 flex items-center justify-center absolute top-4 right-4 cursor-pointer"
      @click="modalStore.closeCreateModal">
      <X />
    </div>

    <form @submit.prevent="$emit(mode === 'create' ? 'createCombo' : 'editCombo')"
          class="w-full flex flex-col gap-6">
      <section class="w-full grid grid-cols-1 gap-4">
        <div v-for="field in fields" :key="field.id"
             class="flex flex-col gap-1 align-center w-full"
             :class="{ 'col-span-2' : field.cols === '2', 'col-span-1': field.cols === '1' }">
          <label :for="field.id">{{ field.name }}</label>
          <input
            :id="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="model[field.id]"
            class="border border-neutral-300 rounded-xl p-2 w-full h-12"
          />
        </div>

        <section class="gap-1 flex flex-col col-span-2">
          <label for="finalCup">Produtos</label>
          <div class="max-h-40 overflow-y-scroll border border-neutral-300 rounded-xl">
            <div v-for="finalCup in finalCupStore.finalCups" :key="finalCup.id">
              <div class="flex justify-between align-center p-4">
                <label :for="finalCup.id">{{ finalCup.name }}</label>
                <input class="w-4 cursor-pointer" v-model="model.final_cup" :value="finalCup.id"
                       type="checkbox" />
              </div>
              <div class="px-4">
                <hr class="border-neutral-300" />
              </div>
            </div>
          </div>
        </section>
      </section>
      <button type="submit"
              class="w-full h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out">
        {{ btnName }}
      </button>
    </form>
  </main>
</template>
