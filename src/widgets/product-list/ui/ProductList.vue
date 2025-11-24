<script setup lang="ts">
import { useProducts } from "@/entities/product/model/useProducts";
import { storeToRefs } from "pinia";

import type { IProductDTO } from "@/shared/api/market/types";

import { useFilterStore } from "@/entities/product/model/store";
import { useCartStore } from "@/entities/cart/model/store";

import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";
import { ProductPagination } from "@/features/product-pagination/ui";
import ProductCard from "@/entities/product/ui/ProductCard.vue";
import ProductSort from "@/features/product-filter/ui/ProductSort.vue";
import TypeFilter from "@/features/product-filter/ui/TypeFilter.vue";
import ShoppingCartPlusIcon from "@/shared/assets/icons/shopping-cart-plus.svg?component";

const cartStore = useCartStore();
const filterStore = useFilterStore();

const { filters } = storeToRefs(filterStore);

const { data, isLoading, isError } = useProducts(filters);

const addToCart = (product: IProductDTO) => {
  cartStore.addCart(product);
};

const isNextDisabled = computed(() => {
  if (!data.value?.items) return true;

  return data.value.items.length < filters.value.amount;
});
</script>

<template>
  <div class="product-list-widget">
    <div v-if="isLoading" class="status-message">Загрузка товаров...</div>

    <div v-else-if="isError" class="status-message error">
      Не удалось загрузить товары
    </div>

    <div
      v-else-if="!data?.items || data.items.length === 0"
      class="status-message"
    >
      Товары не найдены
    </div>
    <template v-else>
      <div class="product-filter">
        <slot name="action" />

        <ProductSort />

        <TypeFilter />
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in data.items"
          :key="product.id"
          :product="product"
          variant="vertical"
        >
          <template #action>
            <Button size="sm" @click.prevent.stop="addToCart(product)">
              <Icon class="product__button-icon" size="20"
                ><ShoppingCartPlusIcon /> </Icon
            ></Button>
          </template>
        </ProductCard>
      </div>

      <ProductPagination
        v-if="data.items.length > 0"
        :is-next-disabled="isNextDisabled"
    /></template>
  </div>
</template>

<style scoped lang="scss">
.product-list-widget {
  width: 100%;
  min-width: 0;
}

.product-filter {
  display: flex;
  gap: 12px;
  position: sticky;
  top: 82px;
  z-index: 100;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 24px;

  @include desktop {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @include tablet {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @include mobile {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
}

.status-message {
  padding: 40px;
  text-align: center;
  color: var(--text-secondary);
}

.product__button-icon {
  color: $bg-secondary;
}
</style>
