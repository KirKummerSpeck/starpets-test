<script setup lang="ts">
interface Props {
  size?: number | string;
  type?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  type: "primary",
});

const getClass = computed(() => `icon--${props.type}`);
</script>

<template>
  <span
    class="icon"
    :class="getClass"
    :style="{
      fontSize: `${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      display: 'inline-flex',
    }"
  >
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.icon {
  align-items: center;
  justify-content: center;
  line-height: 1;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }

  &--primary {
    color: $primary;
  }
  &--secondary {
    color: $secondary;
  }
}
</style>
