<script setup lang="ts">
interface Props {
  to: string | object;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

defineProps<Props>();
</script>

<template>
  <NuxtLink :to="to" :target="target" class="link">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  user-select: none;
  -webkit-user-drag: none;
}
</style>
