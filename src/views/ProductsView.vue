<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import CardsProduct from '@/components/management-menu/products-section/CardsProduct.vue'
</script>

<template>
  <div class="w-full min-h-screen p-8">
    <SectionTitle title="Produtos" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <NewProductBtn />
    </section>
    <section class="w-full flex flex-wrap gap-6">
      <CardsProduct v-for="i in 10" :key="i" />
    </section>
  </div>
</template>

<style scoped></style>
