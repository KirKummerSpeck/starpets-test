import { defineStore } from "pinia";

import type { IProductDTO } from "@shared/api/market/types";

export const useCartStore = defineStore("cart", () => {
  const isOpen = ref(false);
  const items = ref<IProductDTO[]>([]);

  const toggleCart = () => {
    isOpen.value = !isOpen.value;
  };

  const addCart = (item: IProductDTO) => {
    items.value.push(item);
  };

  const removeItem = (id: string) => {
    items.value = items.value.filter((i) => i.id !== id);
  };

  const clearCart = () => {
    items.value = [];
  };

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0);
  });

  const totalPriceNumber = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0);
  });

  const totalItems = computed(() => items.value.length);

  return {
    isOpen,
    items,
    toggleCart,
    removeItem,
    clearCart,
    addCart,
    totalPrice,
    totalPriceNumber,
    totalItems,
  };
});
