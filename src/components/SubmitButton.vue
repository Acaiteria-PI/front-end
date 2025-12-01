<script setup>
defineProps({
  btnName: {
    type: String,
    default: 'Cadastrar'
  }
})
</script>

<template>
  <button type="submit"
          class="w-full h-15 rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 cursor-pointer duration-200 ease-in-out">
    {{ btnName }}
  </button>
</template>

<style scoped>

</style>
