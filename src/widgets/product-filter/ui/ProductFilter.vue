<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Component } from "vue";

import { useFilterStore } from "@/entities/product/model/store";

import {
  RARITY_OPTIONS,
  PROPERTY_OPTIONS,
} from "@/entities/product/lib/constants";

import { Icon } from "@/shared/ui/Icon";
import NeonIcon from "@/shared/assets/icons/neon.svg?component";
import MegaNeonIcon from "@/shared/assets/icons/mega-neon.svg?component";
import RideIcon from "@/shared/assets/icons/ride.svg?component";
import FlyIcon from "@/shared/assets/icons/fly.svg?component";

const store = useFilterStore();
const { filters } = storeToRefs(store);

const ICONS_MAP: Record<string, Component> = {
  neon: NeonIcon,
  mega_neon: MegaNeonIcon,
  flyable: FlyIcon,
  rideable: RideIcon,
};

const isPropertyActive = (opt: (typeof PROPERTY_OPTIONS)[0]) => {
  if (opt.type === "boolean") {
    return filters.value[opt.value];
  }

  return filters.value.levels?.includes(opt.value);
};

const toggleProperty = (opt: (typeof PROPERTY_OPTIONS)[0]) => {
  if (opt.type === "boolean") {
    store.toggleBoolean(opt.value as "flyable" | "rideable");
  } else {
    store.toggleLevel(opt.value);
  }
};
</script>

<template>
  <aside class="filters">
    <div class="filters__header">
      <h3 class="filters__title">Фильтры {{ store.activeFiltersCount }}</h3>

      <button class="filters__reset" @click="store.resetFilters">
        Сбросить ✕
      </button>
    </div>

    <div class="filters__section">
      <h4 class="filters__subtitle">Редкость</h4>
      <div class="rarity-list">
        <button
          v-for="opt in RARITY_OPTIONS"
          :key="opt.value"
          class="rarity-btn"
          :class="[
            `rarity-btn--${opt.value}`,
            { 'is-active': filters.rarities?.includes(opt.value) },
          ]"
          :title="opt.label"
          @click="store.toggleRarity(opt.value)"
        />
      </div>
    </div>

    <div class="filters__section">
      <h4 class="filters__subtitle">Свойства</h4>
      <div class="props-list">
        <label
          v-for="opt in PROPERTY_OPTIONS"
          :key="opt.value"
          class="checkbox-row"
        >
          <input
            type="checkbox"
            :checked="isPropertyActive(opt)"
            class="checkbox-row__input"
            @change="toggleProperty(opt)"
          >

          <span class="checkbox-row__content">
            <span
              v-if="opt.value !== 'default'"
              class="prop-icon"
              :class="`prop-icon--${opt.value}`"
            >
              <Icon size="16">
                <component
                  :is="ICONS_MAP[opt.value]"
                  v-if="ICONS_MAP[opt.value]"
                />
              </Icon>
            </span>

            <span v-else class="prop-icon prop-icon--default">-</span>

            <span class="checkbox-row__text">{{ opt.label }}</span>
          </span>
        </label>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.filters {
  background: $bg-secondary;
  border-radius: $radius;
  padding-top: 20px;
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__title {
    font-weight: bold;
    font-size: 18px;
  }

  &__reset {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 12px;
    &:hover {
      color: var(--text-primary);
    }
  }

  &__section {
    margin-bottom: 24px;
  }

  &__subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }
}

.rarity-list {
  display: flex;
  gap: 8px;
}

.rarity-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;

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

  opacity: 0.4;
  transform: scale(0.9);

  &:hover {
    opacity: 0.7;
  }

  &.is-active {
    opacity: 1;
    transform: scale(1.1);
    border-color: var(--text-primary);
    box-shadow: $shadow-1;
  }
}

.props-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  cursor: pointer;

  &__input {
    margin-right: 10px;
    accent-color: $primary;
    width: 16px;
    height: 16px;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__text {
    font-size: 14px;
  }
}
</style>
