<script setup lang="ts">
import type { IProductDTO } from "@shared/api/market/types";

import Link from "@/shared/ui/Link/Link.vue";
import ProductBadges from "./ProductBadges.vue";

interface Props {
  product: IProductDTO;
  variant?: "vertical" | "horizontal";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "vertical",
});

const rarityClass = computed(
  () => `product-card__rarity--${props.product.rarity}`
);
</script>
<template>
  <Link :to="`/product/${product.id}`" class="card-link">
    <article class="product-card" :class="`product-card--${variant}`">
      <div class="product-card__image-container">
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="product-card__image"
          loading="lazy"
        >
      </div>

      <div class="product-card__info">
        <div class="product-card__header">
          <p class="product-card__subtitle clamp">
            {{ product?.subtitle || "" }}
          </p>

          <h3 class="product-card__title clamp" :title="product.title">
            {{ product.title }}
          </h3>
        </div>

        <div class="product-card__footer">
          <h3 class="product-card__price">{{ product.price }}</h3>

          <div class="product-card__action">
            <slot name="action" />
          </div>
        </div>
      </div>

      <div class="product-card__badges">
        <ProductBadges :game-stats="product.gameStats" :variant="variant" />
      </div>
      <div class="product-card__rarity" :class="rarityClass" /></article
  ></Link>
</template>
<style lang="scss" scoped>
.card-link {
  display: block;
  height: 100%;
}

.product-card {
  $root: &;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 160px;
  padding: 15px 11px 9px 11px;
  background: $bg-secondary;
  box-shadow: $shadow-1;
  border-radius: $radius;
  position: relative;
  box-sizing: border-box;

  &:hover {
    box-shadow: $shadow-2;
  }

  &__image-container {
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__image {
    height: 78px;
  }

  &__badges {
    position: absolute;
    right: 12px;
    top: 12px;
    display: flex;
    flex-direction: column;
  }

  &__subtitle {
    @include text-body;
    color: var(--text-secondary);
    height: 21px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .clamp {
    @include text-clamp;
  }

  &__price {
    color: var(--text-primary);
    font-weight: var(--fw-bold);
  }

  &__rarity {
    position: absolute;
    top: 0;
    left: 50%;
    width: 40px;
    height: 3px;
    border-radius: 0 0 2px 2px;
    transform: translate(-50%);

    &--common {
      background-color: var(--rarity-common);
    }
    &--uncommon {
      background-color: var(--rarity-uncommon);
    }
    &--rare {
      background-color: var(--rarity-rare);
    }
    &--ultra_rare {
      background-color: var(--rarity-ultra-rare);
    }
    &--legendary {
      background-color: var(--rarity-legendary);
    }
  }

  &__action {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    #{$root}__action {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &--horizontal {
    width: 418px;
    height: 90px;
    min-height: auto;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 10px 18px;
    gap: 14px;

    #{$root}__info {
      width: 100px;
    }

    #{$root}__image {
      height: 58px;
    }

    #{$root}__badges {
      position: relative;
      top: 0;
      right: 0;
    }

    #{$root}__rarity {
      left: 0;
      top: 50%;
      transform: rotate(270deg) translate(0, -18px);
    }

    #{$root}__action {
      opacity: 1;
      position: absolute;
      z-index: 100;
      right: 26px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
