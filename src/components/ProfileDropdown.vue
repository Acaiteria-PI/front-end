<script setup>
import { ref } from 'vue'
import { LogOut } from 'lucide-vue-next'
import { useAuth } from '@/stores/auth.js'

const authStore = useAuth()
const isDropdownOpen = ref(false)

const emit = defineEmits(['open-logout'])

const openLogoutConfirm = () => {
  isDropdownOpen.value = false
  emit('open-logout')
}
</script>

<template>
  <div class="relative">
    <div
      class="bg-rose-900 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:bg-rose-950 transition-colors shadow-md"
      title="Perfil"
      @click="isDropdownOpen = !isDropdownOpen"
    >
      <p class="text-white font-semibold text-lg">{{ authStore.firstLetter }}</p>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-50"
    >
      <button
        @click="openLogoutConfirm"
        class="w-full px-4 py-2 flex items-center gap-2 text-neutral-700 hover:text-red-600 hover:bg-neutral-50 transition-colors cursor-pointer"
      >
        <LogOut size="18" />
        <span>Sair</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
