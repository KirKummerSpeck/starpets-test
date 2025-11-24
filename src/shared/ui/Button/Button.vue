<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
});

const getClasses = computed(() => {
  return ["btn", `btn--${props.variant}`, `btn--${props.size}`];
});
</script>

<template>
  <button :class="getClasses" v-bind="$attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &--md {
    padding: 11px;
    font-size: 14px;
    height: 44px;
  }

  &--sm {
    padding: 8px;
    font-size: 12px;
    height: 36px;
  }

  &--primary {
    background: $primary;
    color: $text-white;

    &:hover {
      background: $primary-hover;
    }

    &:active {
      background: $primary-active;
    }
  }

  &--secondary {
    background: $bg-secondary;
    color: $text-label-secondary;
    &:hover {
      filter: brightness(0.95);
    }
  }

  &:disabled {
    background: $bg-btn-disabled;
    color: $text-white;
    cursor: auto;

    &:hover {
      background: $bg-btn-disabled;
      color: $text-white;
    }
  }

  &--text {
    background: transparent;
    color: $text-label-secondary;
    &:hover {
      color: $primary;
    }
  }
}
</style>
