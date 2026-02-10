<script setup>
import { PencilLine, Trash, Mail, Phone, MapPin } from 'lucide-vue-next'
import { useModalStore } from '@/stores/modal.js'
import { useRouter } from 'vue-router'

const props = defineProps(['supplier'])

const modalStore = useModalStore()
const router = useRouter()

const typeLabels = {
  manufacturer: 'Fabricante',
  distributor: 'Distribuidor',
  retailer: 'Varejista',
  importer: 'Importador'
}

const displayType = (type) => typeLabels[type] || type || 'N/A'

const addressLine = (supplier) => {
  const parts = [
    supplier.address_data?.street,
    supplier.address_data?.number,
    supplier.address_data?.city,
    supplier.address_data?.state,
    supplier.address_data?.zip_code
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Endereço não informado'
}
</script>

<template>
  <div class="bg-white md:min-w-md rounded-xl border border-gray-300 p-5 flex flex-col gap-4">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 class="text-lg font-semibold truncate">{{ supplier.name || 'Fornecedor' }}</h2>
        <p class="text-sm text-gray-500 truncate">{{ supplier.legal_name || 'Razão social não informada' }}</p>
        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-600 mt-2">
          <span class="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            {{ displayType(supplier.type) }}
          </span>
          <span class="text-gray-400">•</span>
          <span>{{ supplier.document || 'Documento não informado' }}</span>
        </div>
      </div>
      <div class="flex gap-3 shrink-0">
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <PencilLine :size="20" @click="router.push(`/management-menu/suppliers/${supplier.id}/edit`)" />
        </div>
        <div class="cursor-pointer hover:bg-gray-300 rounded-lg p-1 transition-all">
          <Trash :size="20" @click="modalStore.openConfirmDeleteModal(supplier.id)" />
        </div>
      </div>
    </div>

    <div class="flex items-start gap-2 text-sm text-gray-600">
      <MapPin :size="16" class="mt-0.5" />
      <span>{{ addressLine(supplier) }}</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <Mail :size="16" />
        <span>{{ supplier.contact_data?.business_email || 'Email comercial não informado' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Mail :size="16" />
        <span>{{ supplier.contact_data?.financial_email || 'Email financeiro não informado' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Phone :size="16" />
        <span>{{ supplier.contact_data?.phone_number || 'Telefone não informado' }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Phone :size="16" />
        <span>{{ supplier.contact_data?.whatsapp_number || 'WhatsApp não informado' }}</span>
      </div>
    </div>
  </div>
</template>
