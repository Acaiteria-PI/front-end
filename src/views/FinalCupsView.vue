<script setup>
import SectionTitle from "@/components/management-menu/SectionTitle.vue";
import SearchBar from "@/components/management-menu/SearchBar.vue";
import NewProductBtn from "@/components/management-menu/NewProductBtn.vue";
import FinalCupCard from "@/components/management-menu/products-section/FinalCupCard.vue";
import { useFinalCupStore } from "@/stores/finalCup.js";
import Loading from "vue-loading-overlay";
import { useLoading } from "@/stores/loading.js";
import "vue-loading-overlay/dist/css/index.css";
import { onMounted } from "vue";
import { useModalStore } from "@/stores/modal.js";
import RegisterFinalCupModal from "@/components/management-menu/products-section/RegisterFinalCupModal.vue";
import ConfirmDeleteModal from "@/components/management-menu/ConfirmDeleteModal.vue";

const finalCupStore = useFinalCupStore();

const loadingStore = useLoading();
const modalStore = useModalStore();

onMounted(() => {
  loadingStore.isLoading = true;
  finalCupStore.fetchFinalCups();
  loadingStore.isLoading = false;
});
</script>

<template>
  <loading
    v-model:active="loadingStore.isLoading"
    :is-full-page="loadingStore.fullPage"
  />
  <main class="w-full p-8 mb-20 md:mb-0">
    <SectionTitle title="Produtos" />
    <section class="flex flex-row items-start justify-between gap-4 md:gap-0">
      <SearchBar />
      <NewProductBtn
        title="+ Novo produto"
        @click="modalStore.openCreateModal('create')"
      />
    </section>
    <section v-if="finalCupStore.finalCups.length > 0" class="w-full flex flex-wrap gap-6 mt-8">
      <FinalCupCard
        :product="finalCup"
        v-for="finalCup in finalCupStore.finalCups"
        :key="finalCup.id"
      />
    </section>
    <div v-else class="w-full h-64 flex flex-col items-center justify-center mt-8">
      <p class="text-gray-500 text-lg">Nenhum produto encontrado.</p>
    </div>

    <div
      v-if="modalStore.createModal === true"
      class="fixed inset-0 flex items-center justify-center"
    >
      <RegisterFinalCupModal
        @create-final-cup="finalCupStore.createFinalCup(finalCupStore.newFinalCup)"
        @edit-final-cup="finalCupStore.updateFinalCup()"
        :mode="modalStore.modalMode"
        :model="
          modalStore.modalMode === 'create'
            ? finalCupStore.newFinalCup
            : modalStore.editingItem
        "
        :title="
          modalStore.modalMode === 'create'
            ? 'Cadastrar copo pronto'
            : 'Editar copo pronto'
        "
        :btn-name="modalStore.modalMode === 'create' ? 'Cadastrar' : 'Salvar'"
        class="absolute inset-0 m-auto z-50"
      />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>

    <div
      v-if="modalStore.confirmDeleteModal === true"
      class="fixed inset-0 flex items-center justify-center"
    >
      <ConfirmDeleteModal
        @confirm="finalCupStore.deleteFinalCup(modalStore.itemToDelete)"
        @cancel="modalStore.closeConfirmDeleteModal"
        class="absolute inset-0 m-auto z-50"
      />
      <div class="fixed inset-0 bg-black/50 z-40"></div>
    </div>
  </main>
</template>

<style scoped></style>
