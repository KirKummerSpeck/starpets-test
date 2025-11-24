<script setup lang="ts">
const route = useRoute();

const productId = computed(() => route.params.id);
</script>

<template>
  <div class="mock-page">
    <div class="container">
      <h1>Страница товара - {{ productId }}</h1>
    </div>
  </div>
</template>
