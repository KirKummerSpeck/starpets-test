<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/entities/product/model/store";

import { Icon } from "@/shared/ui/Icon";
import StarIcon from "@/shared/assets/icons/star.svg?component";
import ChevronDownIcon from "@/shared/assets/icons/chevron-down.svg?component";

interface SortOption {
  label: string;
  value: "popularity" | "price";
}

const store = useFilterStore();
const { filters } = storeToRefs(store);

const options: SortOption[] = [
  { label: "Популярность", value: "popularity" },
  { label: "Цена", value: "price" },
];

const currentLabel = computed(() => {
  const found = options.find((opt) => opt.value === filters.value.sort);
  return found ? found.label : "Сортировка";
});

const onSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  store.setSort(target.value);
};
</script>
<template>
  <div class="sort-control">
    <div class="sort-control__visual">
      <Icon class="sort-icon-left" size="16">
        <StarIcon />
      </Icon>

      <span class="sort-label">{{ currentLabel }}</span>

      <Icon class="sort-icon-right" size="12">
        <ChevronDownIcon />
      </Icon>
    </div>

    <select
      :value="filters.sort"
      class="sort-control__input"
      @change="onSortChange"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.sort-control {
  position: relative;
  width: 200px;
  height: 40px;
  cursor: pointer;

  &__visual {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $bg-secondary;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    border: 1px solid transparent;
    transition: border-color 0.2s;
    box-shadow: $shadow-1;
    z-index: 1;
    pointer-events: none;
  }

  &:hover &__visual {
    border-color: $bg-body;
  }

  .sort-label {
    flex-grow: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .sort-icon-right {
    color: $bg-secondary;
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    appearance: none;
    z-index: 2;
  }
}
</style>
