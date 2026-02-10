<script setup>
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        class="relative z-50 w-66 min-h-42 bg-white flex flex-col items-center justify-center shadow-xl p-6 gap-4 rounded-2xl"
      >
        <section class="w-full flex flex-col justify-center items-center">
          <h1 class="text-lg font-bold">Tem certeza?</h1>
          <p class="text-sm text-neutral-500 text-center">Essa ação é irreversível.</p>
        </section>
        <div class="options w-full flex flex-row justify-between">
          <button
            @click="emit('cancel')"
            class="w-24 h-10 text-sm border rounded-xl border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="emit('confirm')"
            class="w-24 h-10 text-sm bg-red-800 text-white rounded-xl hover:bg-red-900 transition-colors cursor-pointer"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
