<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/entities/product/model/store";

import { Button } from "@/shared/ui/Button";

defineProps<{
  isNextDisabled: boolean;
}>();

const filterStore = useFilterStore();
const { filters } = storeToRefs(filterStore);
const { setPage } = filterStore;

const handlePageChange = (newPage: number) => {
  setPage(newPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="pagination">
    <Button
      :disabled="filters.page === 1"
      @click="handlePageChange(filters.page - 1)"
    >
      Назад
    </Button>

    <span>Стр. {{ filters.page }}</span>

    <Button
      :disabled="isNextDisabled"
      @click="handlePageChange(filters.page + 1)"
    >
      Вперед
    </Button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0;
}
</style>
