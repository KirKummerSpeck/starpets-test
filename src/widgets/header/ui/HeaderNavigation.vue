<script setup lang="ts">
import Link from "@/shared/ui/Link/Link.vue";

import { HEADER_MENU_ITEMS } from "../lib/menu";
</script>

<template>
  <nav class="header-nav">
    <Link
      v-for="link in HEADER_MENU_ITEMS"
      :key="link.to"
      :to="link.to"
      class="nav-link"
      active-class="active"
    >
      <div class="nav-link__label">
        {{ link.label }}
      </div>
    </Link>
  </nav>
</template>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: var(--text-nav-default);

  &:hover {
    color: var(--text-nav-active);
  }

  &.active {
    color: var(--text-nav-active);

    .nav-link__label {
      &::after {
        content: "";
        width: 40px;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        background: var(--color-primary);
        border-radius: 2px 2px 0 0;
      }
    }
  }

  &__label {
    position: relative;
    min-height: 86px;
    display: flex;
    align-items: center;
  }
}
</style>
