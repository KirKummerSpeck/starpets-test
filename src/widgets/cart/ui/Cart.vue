<script setup lang="ts">
import { useCartStore } from "@/entities/cart/model/store";
import { useCheckout } from "@/features/checkout/model/useCheckout";
import { ProductCard } from "@/entities/product";

import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";

import ShoppingIcon from "@/shared/assets/icons/shopping-cart.svg?component";
import BasketIcon from "@/shared/assets/icons/basket.svg?component";
import XIcon from "@/shared/assets/icons/x.svg?component";
import ChevronDownIcon from "@/shared/assets/icons/chevron-down.svg?component";

const store = useCartStore();

const { handleCheckout } = useCheckout();

const removeProduct = (id: string) => {
  store.removeItem(id);
};
</script>
<template>
  <Dropdown v-model="store.isOpen" width="420px" right class="cart-widget">
    <template #trigger>
      <div class="dropdown">
        <Button>
          <Icon size="20" class="cart-widget__icon"><ShoppingIcon /></Icon>
        </Button>

        <div class="dropdown__info">
          <span>К покупке</span>
          <span class="label">{{ store.totalPrice }}</span>
        </div>
        <Icon type="secondary" size="20"><ChevronDownIcon /></Icon>
      </div>
    </template>
    <template #default>
      <div class="cart-content">
        <div class="cart-content__header">
          <Icon size="24"><BasketIcon /></Icon>
          <span class="label">{{ store.totalItems }} Предмета в корзине </span>
        </div>

        <div class="cart-content__body">
          <ProductCard
            v-for="item in store.items"
            :key="item.id"
            :product="item"
            variant="horizontal"
            ><template #action
              ><Button
                size="sm"
                variant="secondary"
                @click.prevent.stop="removeProduct(item.id)"
              >
                <Icon class="product__button-icon" size="20"
                  ><XIcon /> </Icon></Button
            ></template>
          </ProductCard>
        </div>
        <div class="cart-content__actions">
          <div class="cart-content__price">
            <span class="cart-content__sum">Сумма покупки</span>
            <span class="cart-content__sum label">
              {{ store.totalPrice }}
            </span>
          </div>

          <Button :disabled="store.totalItems === 0" @click="handleCheckout">
            <Icon class="cart-widget__icon" size="24"><BasketIcon /></Icon>
            Купить
          </Button>
          <Button
            :disabled="store.totalItems === 0"
            variant="text"
            @click="store.clearCart()"
          >
            Очистить корзину
          </Button>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
<style lang="scss" scoped>
.cart-widget {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 19px 20px;
  background-color: $border;

  &__icon {
    color: $bg-secondary;
  }

  &__badge {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 6px;
    background: $bg-secondary;
    color: $text-main;
  }
}
.dropdown {
  display: flex;
  align-items: center;
  gap: 8px;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 91px;

    @include mobile {
      display: none;
    }
  }
}

.cart-content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__price {
    display: flex;
    justify-content: space-between;
  }

  &__button-icon {
    color: $bg-secondary;
  }
}

.product__button-icon {
  color: $text-secondary;
}
</style>
