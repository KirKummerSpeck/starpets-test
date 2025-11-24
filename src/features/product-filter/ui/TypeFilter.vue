<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/entities/product/model/store";
import type { ProductType } from "@shared/api/market/types";

interface TypeOption {
  label: string;
  value: ProductType;
}

const store = useFilterStore();
const { filters } = storeToRefs(store);

const typesOptions: TypeOption[] = [
  { label: "Транспорт", value: "transport" },
  { label: "Яйцо", value: "egg" },
  { label: "Питомец", value: "pet" },
  { label: "Зелье", value: "potion" },
];

const isActive = (val: string) => filters.value.types?.includes(val);
</script>

<template>
  <div class="type-filter">
    <button
      v-for="type in typesOptions"
      :key="type.value"
      class="type-btn"
      :class="{ 'is-active': isActive(type.value) }"
      @click="store.toggleType(type.value)"
    >
      <span>{{ type.label }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.type-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-btn {
  background: $bg-secondary;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-primary);
  }

  &.is-active {
    box-shadow: $shadow-1;
    font-weight: 600;
  }
}
</style>
