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

  const totalPriceNumber = computed(() => {
    const sum = items.value.reduce((acc, item) => acc + item.price, 0);

    return Math.round(sum * 100) / 100;
  });

  const totalPrice = computed(() => {
    return totalPriceNumber.value.toFixed(2);
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
