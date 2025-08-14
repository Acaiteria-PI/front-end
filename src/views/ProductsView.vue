<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue';
import CardsProduct from '@/components/management-menu/products-section/CardsProduct.vue';
</script>

<template>
  <div class="w-full p-8">
    <SectionTitle title="Produtos" class="mt-8" />

    <section class="flex flex-row itens-start justify-between">
      <SearchBar /> <NewProductBtn />
    </section>

    <div class="flex flex-row gap-[24px] mt-4">
      <CardsProduct />
      <CardsProduct />
    </div>
    <div class="flex flex-row gap-[24px]">
      <CardsProduct />
      <CardsProduct />
    </div>
  </div>
</template>

<style scoped></style>
