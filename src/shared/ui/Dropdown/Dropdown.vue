<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  width?: string;
  right?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  width: "auto",
  right: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="dropdown" v-bind="$attrs">
    <div class="dropdown__trigger" @click="toggle">
      <slot name="trigger" :is-open="modelValue" />
    </div>

    <Transition name="dropdown-fade">
      <div
        v-if="modelValue"
        class="dropdown__content"
        :class="{ 'dropdown__content--right': right }"
        :style="{ width: width }"
      >
        <slot />
      </div>
    </Transition>

    <div v-if="modelValue" class="dropdown__overlay" @click="close" />
  </div>
</template>
<style lang="scss" scope>
.dropdown {
  position: relative;
  display: inline-block;

  &__trigger {
    cursor: pointer;
  }

  &__content {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    background: var(--bg-secondary);
    border-radius: 16px;
    box-shadow: var(--shadow-elevation-1);
    z-index: 100;
    cursor: default;

    &--right {
      left: auto;
      right: 0;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: transparent;
    cursor: default;
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
