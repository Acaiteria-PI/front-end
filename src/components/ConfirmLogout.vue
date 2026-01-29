<script setup>
import { useAuth } from '@/stores/auth.js'
import { LogOut } from 'lucide-vue-next'

const authStore = useAuth()

const props = defineProps({
  show: { type: Boolean, required: true },
})

const emit = defineEmits(['close'])

const confirmLogout = () => {
  authStore.logout()
  emit('close')
}

const cancelLogout = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="cancelLogout"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl w-80 flex flex-col items-center gap-4">
        <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
          <LogOut size="28" class="text-red-600" />
        </div>
        <h2 class="text-xl font-bold text-neutral-800">Sair da conta?</h2>
        <p class="text-neutral-600 text-center text-sm">
          Tem certeza que deseja sair da sua conta?
        </p>
        <div class="flex gap-3 w-full mt-2">
          <button
            @click="cancelLogout"
            class="flex-1 px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="confirmLogout"
            class="flex-1 px-4 py-2 rounded-xl bg-red-800 text-white hover:bg-red-900 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
