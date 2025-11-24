<script setup lang="ts">
import { useUserStore } from "@/entities/user/model/store";

import UserProfile from "@entities/user/ui/UserProfile.vue";

import HeaderNavigation from "./HeaderNavigation.vue";

const userStore = useUserStore();
</script>
<template>
  <header class="header-widget">
    <div class="header-widget__left">
      <div class="header-widget__logo">
        <img class="logo__desktop" src="/images/logo.png" alt="logo" >
        <img class="logo__small" src="/images/logo-small.png" alt="logo" >
      </div>

      <HeaderNavigation class="header-widget__nav" />
    </div>

    <div class="header-widget__right">
      <div class="header-widget__actions">
        <div v-if="userStore.user" class="header-balance">
          <span class="label">{{ userStore.getBalance }} ₽</span>
          <span class="sub-label">Ваш баланс</span>
        </div>

        <UserProfile />

        <div class="header-slot-wrapper">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header-widget {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 28px;

  @include desktop {
    padding-left: 14px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 80px;

    @include desktop {
      gap: 28px;
    }
  }

  &__right {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .header-balance {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include desktop {
      display: none;
    }
  }

  &__nav {
    @include tablet {
      display: none;
    }
  }
}

.header-widget__logo {
  .logo__desktop {
    @include tablet {
      display: none;
    }
  }

  .logo__small {
    display: none;

    @include tablet {
      display: block;
    }
  }
}
</style>
