<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import CardsProduct from '@/components/management-menu/products-section/CardsProduct.vue'
</script>

<template>
  <div class="w-full p-8">
    <SectionTitle title="Produtos" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <NewProductBtn />
    </section>
    <section class="w-full h-100 flex flex-wrap gap-6">
      <CardsProduct />
      <CardsProduct />
      <CardsProduct />
      <CardsProduct />
      <CardsProduct />
      <CardsProduct />

    </section>
  </div>
</template>

<style scoped></style>
