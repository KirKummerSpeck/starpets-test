<script lang="ts" setup>
import { ProductFilter } from "@widgets/product-filter/ui";
import { ProductList } from "@widgets/product-list/ui";
</script>
<template>
  <div class="market-page">
    <div class="container">
      <div class="layout">
        <aside class="sidebar">
          <ProductFilter />
        </aside>
        <main class="content">
          <ProductList />
        </main>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.market-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

.container {
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  position: relative;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.sidebar {
  width: 100%;
  min-width: 355px;
  max-width: 355px;
  position: sticky;
  flex-shrink: 0;
  top: 82px;

  @include tablet {
    display: none;
  }
}

.content {
  flex-grow: 1;
  width: 100%;
  margin-top: 24px;
}
</style>
