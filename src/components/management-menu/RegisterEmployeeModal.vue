<script setup>
import { onMounted, reactive } from 'vue'
import { X } from 'lucide-vue-next'
import { useModalStore } from '@/stores/modal.js'
import { useEmployeeStore } from '@/stores/employee.js'
import { useEstablishmentStore } from '@/stores/establishment.js'

const employeeStore = useEmployeeStore()
const establishmentStore = useEstablishmentStore()
const modalStore = useModalStore()

defineProps({
  title: { type: String, required: true },
  btnName: { type: String, required: true },
  mode: { type: String, required: true },
  model: { type: Object, required: true }
})

defineEmits(['createEmployee', 'editEmployee'])

const fields = reactive([
  {
    id: 'registration',
    name: 'N° de registro',
    placeholder: 'Ex: 123456',
    type: 'text',
    cols: '1'
  },
  {
    id: 'name',
    name: 'Nome',
    placeholder: 'Ex: João da Silva',
    type: 'text',
    cols: '2'
  },
  {
    id: 'email',
    name: 'Email',
    placeholder: 'Ex: joao@gmail.com',
    type: 'email',
    cols: '2'
  },
  {
    id: 'password',
    name: 'Senha',
    placeholder: 'Senha',
    type: 'password',
    cols: '2'
  },
  {
    id: 'password_confirmation',
    name: 'Confirmar senha',
    placeholder: 'Confirmar senha',
    type: 'password',
    cols: '2'
  }
])

onMounted(() => {
  employeeStore.fetchEmployees()
  establishmentStore.fetchEstablishments()
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

    <form @submit.prevent="$emit(mode === 'create' ? 'createEmployee' : 'editEmployee')"
          class="w-full flex flex-col gap-6">
      <section class="w-full grid grid-cols-2 gap-4">

        <div class="flex flex-col gap-1 col-span-1 w-full">
          <label for="Establishment">Estabelecimento</label>
          <select v-model="model.Establishment" name="establishment" id="establishment"
                  class="border border-neutral-300 rounded-xl p-2 w-full h-12">
            <option v-for="establishment in establishmentStore.establishments"
                    :key="establishment.id"
                    :value="establishment.id">{{ establishment.name }}
            </option>
          </select>
        </div>

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

        <div class="flex items-center justify-between p-4 bg-gray-100 rounded-xl col-span-2">
          <div>
            <p class="font-semibold text-gray-900">Administrador</p>
            <p class="text-sm text-gray-600">Acesso total ao sistema</p>
          </div>

          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="model.is_management"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-rose-500
                  rounded-full peer peer-checked:after:translate-x-full
                  peer-checked:after:border-white after:content-['']
                  after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:rounded-full after:h-5 after:w-5
                  after:transition-all peer-checked:bg-rose-900">
            </div>
          </label>
        </div>
      </section>
      <button type="submit"
              class="w-full h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out">
        {{ btnName }}
      </button>
    </form>
  </main>
</template>
