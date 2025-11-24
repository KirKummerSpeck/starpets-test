<script lang="ts" setup>
import { Header } from "@widgets/header/ui/";
import { Cart } from "@widgets/cart/ui";
</script>
<template>
  <div class="layout-wrapper">
    <Header class="header">
      <template #actions><Cart /></template>
    </Header>

    <main>
      <slot />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-body);
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

main {
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding-top: var(--header-height);
  padding: var(--header-height) 32px 0 32px;
  @include desktop {
    padding-left: 14px;
  }
}
</style>
