import { defineStore } from "pinia";
import type {
  IGetItemsParams,
  ProductRarity,
  ProductPumping,
  ProductSort,
  ProductType,
} from "@shared/api/market/types";

import { DEFAULT_FILTERS } from "../lib/constants";

export const useFilterStore = defineStore("productFilters", () => {
  const filters = ref<IGetItemsParams>(
    JSON.parse(JSON.stringify(DEFAULT_FILTERS))
  );

  const setPage = (page: number) => {
    filters.value.page = page;
  };

  const toggleArrayItem = <T>(array: T[] | undefined, item: T) => {
    if (!array) return [item];

    const index = array.indexOf(item);

    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1);
    }
  };

  const toggleRarity = (rarity: ProductRarity) => {
    if (!filters.value.rarities) filters.value.rarities = [];

    toggleArrayItem(filters.value.rarities, rarity);

    filters.value.page = 1;
  };

  const toggleLevel = (level: ProductPumping) => {
    if (!filters.value.levels) filters.value.levels = [];

    toggleArrayItem(filters.value.levels, level);

    filters.value.page = 1;
  };

  const toggleBoolean = (field: "flyable" | "rideable") => {
    filters.value[field] = !filters.value[field];
    filters.value.page = 1;
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    filters.value = JSON.parse(JSON.stringify(DEFAULT_FILTERS));
  };

  const setSort = (value: ProductSort) => {
    filters.value.sort = value;
    filters.value.page = 1;
  };

  const toggleType = (typeValue: ProductType) => {
    if (!filters.value.types) filters.value.types = [];

    toggleArrayItem(filters.value.types, typeValue);

    filters.value.page = 1;
  };

  const activeFiltersCount = computed(() => {
    let count = 0;

    count += filters.value.rarities?.length || 0;
    count += filters.value.levels?.length || 0;
    count += filters.value.types?.length || 0;

    if (filters.value.flyable) count++;
    if (filters.value.rideable) count++;

    return count;
  });

  return {
    filters,
    setPage,
    toggleRarity,
    toggleLevel,
    toggleBoolean,
    resetFilters,
    setSort,
    toggleType,
    activeFiltersCount,
  };
});
