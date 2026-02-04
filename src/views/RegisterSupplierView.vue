<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'
import { useSupplierStore } from '@/stores/supplier.js'
import { useAddressStore } from '@/stores/address.js'
import { useContactStore } from '@/stores/contact.js'

const route = useRoute()
const router = useRouter()
const supplierStore = useSupplierStore()
const addressStore = useAddressStore()
const contactStore = useContactStore()
const loadingStore = useLoading()

const isEdit = computed(() => route.name === 'supplier-edit')
const supplierModel = ref({ ...supplierStore.newSupplier })
const contactModel = ref({ ...contactStore.newContact })
const addressModel = ref({ ...addressStore.newAddress })

const supplierTypes = [
  { label: 'Fabricante', value: 'MANUFACTURER' },
  { label: 'Distribuidor', value: 'DISTRIBUTOR' },
  { label: 'Varejista', value: 'RETAILER' },
  { label: 'Importador', value: 'IMPORTER' },
]

const brazilStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

const infoFields = [
  {
    id: 'legal_name',
    name: 'Razão social',
    placeholder: 'Ex: Açai LTDA',
    type: 'text',
    cols: '2',
  },
  {
    id: 'name',
    name: 'Nome fantasia',
    placeholder: 'Ex: Açai do Norte',
    type: 'text',
    cols: '2',
  },
  {
    id: 'document',
    name: 'Documento',
    placeholder: 'CPF ou CNPJ',
    type: 'text',
    cols: '1',
  },
]

const addressFields = [
  {
    id: 'street',
    name: 'Rua',
    placeholder: 'Ex: Av. Brasil',
    type: 'text',
    cols: '2',
  },
  {
    id: 'number',
    name: 'Número',
    placeholder: 'Ex: 123',
    type: 'text',
    cols: '1',
  },
  {
    id: 'city',
    name: 'Cidade',
    placeholder: 'Ex: Curitiba',
    type: 'text',
    cols: '1',
  },
  {
    id: 'zip_code',
    name: 'CEP',
    placeholder: 'Ex: 80000-000',
    type: 'text',
    cols: '1',
  },
]

const contactFields = [
  {
    id: 'business_email',
    name: 'Email comercial (opcional)',
    placeholder: 'Ex: contato@empresa.com',
    type: 'email',
    cols: '2',
  },
  {
    id: 'financial_email',
    name: 'Email financeiro (opcional)',
    placeholder: 'Ex: financeiro@empresa.com',
    type: 'email',
    cols: '2',
  },
  {
    id: 'phone_number',
    name: 'Telefone (opcional)',
    placeholder: 'Ex: (11) 99999-9999',
    type: 'text',
    cols: '1',
  },
  {
    id: 'whatsapp_number',
    name: 'WhatsApp (opcional)',
    placeholder: 'Ex: (11) 99999-9999',
    type: 'text',
    cols: '1',
  },
]

const loadSupplierData = async () => {
  try {
    if (!isEdit.value) return
    await supplierStore.fetchSuppliers()
    const supplierId = String(route.params.id || '')
    const found = supplierStore.suppliers.find((s) => String(s.id) === supplierId)
    if (found) {
      supplierModel.value = {
        ...supplierStore.newSupplier,
        ...found,
      }
    }
  } catch (error) {
    console.error('Error loading supplier data:', error)
  }
}

const loadAddressData = async () => {
  try {
    if (!isEdit.value) return
    await addressStore.fetchAddresses()
    await supplierStore.fetchSuppliers()
    const supplierId = String(route.params.id || '') // Acha o id do Supplier atual
    const referentSupplier = supplierStore.suppliers.find((s) => String(s.id) === supplierId) // Acha o Supplier atual por meio do id
    const addressId = referentSupplier?.address // Acha o id do Address por meio do Supplier

    const found = addressStore.addresses.find((a) => a.id === addressId)
    if (found) {
      addressModel.value = {
        ...addressStore.newAddress,
        ...found,
      }
    }
  } catch (error) {
    console.error('Error loading address data:', error)
  }
}

const loadContactData = async () => {
  try {
    if (!isEdit.value) return
    await contactStore.fetchContacts()
    await supplierStore.fetchSuppliers()
    const supplierId = String(route.params.id || '')
    const referentSupplier = supplierStore.suppliers.find((s) => String(s.id) === supplierId)
    const contactId = referentSupplier?.contact

    const found = contactStore.contacts.find((c) => c.id === contactId)
    if (found) {
      contactModel.value = {
        ...contactStore.newContact,
        ...found,
      }
    }
  } catch (error) {
    console.error('Error loading contact data:', error)
  }
}

const handleSubmit = async () => {
  if (isEdit.value) {
    await addressStore.updateAddress(addressModel.value)
    await contactStore.updateContact(contactModel.value)
    await supplierStore.updateSupplier(supplierModel.value)
  } else {
    const createdAddress = await addressStore.createAddress(addressModel.value)
    const createdContact = await contactStore.createContact(contactModel.value)
    
    supplierModel.value.address = createdAddress.id
    supplierModel.value.contact = createdContact.id
    await supplierStore.createSupplier(supplierModel.value)
  }
  router.push('/management-menu/suppliers')
}

onMounted(() => {
  loadingStore.isLoading = true
  loadAddressData()
  loadContactData()
  loadSupplierData()
  loadingStore.isLoading = false
})
</script>

<template>
  <loading v-model:active="loadingStore.isLoading" :is-full-page="loadingStore.fullPage" />
  <main class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle :title="isEdit ? 'Editar fornecedor' : 'Cadastrar fornecedor'" />
    <section
      class="w-full max-w-4xl bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-6">
        <section class="w-full flex flex-col gap-3">
          <h2 class="text-lg font-semibold">Informações</h2>
          <div class="w-full grid grid-cols-2 gap-4">
            <div
              v-for="field in infoFields"
              :key="field.id"
              class="flex flex-col gap-1 align-center w-full"
              :class="{ 'col-span-2': field.cols === '2', 'col-span-1': field.cols === '1' }"
            >
              <label :for="field.id">{{ field.name }}</label>
              <input
                :id="field.id"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="supplierModel[field.id]"
                class="border border-neutral-300 rounded-xl p-2 w-full h-12"
              />
            </div>

            <div class="flex flex-col gap-1 col-span-1">
              <label for="type">Tipo</label>
              <select
                v-model="supplierModel.type"
                name="type"
                id="type"
                class="border border-neutral-300 rounded-xl p-2 w-full h-12"
              >
                <option v-for="type in supplierTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>
        </section>

        <section class="w-full flex flex-col gap-3">
          <h2 class="text-lg font-semibold">Endereço</h2>
          <div class="w-full grid grid-cols-2 gap-4">
            <div
              v-for="field in addressFields"
              :key="field.id"
              class="flex flex-col gap-1 align-center w-full"
              :class="{ 'col-span-2': field.cols === '2', 'col-span-1': field.cols === '1' }"
            >
              <label :for="field.id">{{ field.name }}</label>
              <input
                :id="field.id"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="addressModel[field.id]"
                class="border border-neutral-300 rounded-xl p-2 w-full h-12"
              />
            </div>

            <div class="flex flex-col gap-1 col-span-1">
              <label for="state">UF</label>
              <select
                v-model="addressModel.state"
                name="state"
                id="state"
                class="border border-neutral-300 rounded-xl p-2 w-full h-12"
              >
                <option v-for="state in brazilStates" :key="state" :value="state">
                  {{ state }}
                </option>
              </select>
            </div>
          </div>
        </section>

        <section class="w-full flex flex-col gap-3">
          <h2 class="text-lg font-semibold">Contato</h2>
          <div class="w-full grid grid-cols-2 gap-4">
            <div
              v-for="field in contactFields"
              :key="field.id"
              class="flex flex-col gap-1 align-center w-full"
              :class="{ 'col-span-2': field.cols === '2', 'col-span-1': field.cols === '1' }"
            >
              <label :for="field.id">{{ field.name }}</label>
              <input
                :id="field.id"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="contactModel[field.id]"
                class="border border-neutral-300 rounded-xl p-2 w-full h-12"
              />
            </div>
          </div>
        </section>

        <div class="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            class="w-full md:w-auto h-12 px-6 rounded-xl bg-neutral-200 font-medium text-neutral-800 hover:bg-neutral-300 cursor-pointer duration-200 ease-in-out"
            @click="router.push('/management-menu/suppliers')"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="w-full md:w-auto h-12 px-6 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out"
          >
            {{ isEdit ? 'Salvar' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
