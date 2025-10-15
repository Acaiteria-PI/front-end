<script setup>
import SectionTitle from '@/components/management-menu/SectionTitle.vue'
import SearchBar from '@/components/management-menu/SearchBar.vue'
import NewProductBtn from '@/components/management-menu/NewProductBtn.vue'
import CardsProduct from '@/components/management-menu/products-section/CardsProduct.vue'
import Loading from 'vue-loading-overlay'
import { useLoading } from '@/stores/loading.js'
import 'vue-loading-overlay/dist/css/index.css'

const loadingStore = useLoading()
</script>

<template>
  <loading v-model:active="loadingStore.isLoading"
           :is-full-page="loadingStore.fullPage" />
  <main class="w-full p-8">
    <SectionTitle title="Produtos" class="mt-8" />
    <section class="flex flex-row items-start justify-between">
      <SearchBar />
      <NewProductBtn title="+ Novo produto" />
    </section>
    <section class="w-full flex flex-wrap gap-6">
      <CardsProduct v-for="i in 10" :key="i" />
    </section>
  </main>
</template>

<style scoped></style>
