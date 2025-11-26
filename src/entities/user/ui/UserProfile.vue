<script lang="ts" setup>
import Link from "@/shared/ui/Link/Link.vue";

interface Props {
  name: string;
  image: string;
}

defineProps<Props>();
</script>
<template>
  <Link to="/profile">
    <div class="user-profile">
      <div class="user-profile__text">
        <span class="user-name label">{{ name }}</span>
        <span class="user-role">Профиль</span>
      </div>
      <div class="user-avatar">
        <img
          :src="image"
          alt="Avatar"
          class="user-avatar__image"
          width="56"
          height="56"
        />
      </div></div
  ></Link>
</template>
<style lang="scss" scoped>
.user-profile {
  display: flex;
  gap: 12px;
  align-items: center;

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @include mobile {
      display: none;
    }

    .user-role {
      @include text-body;
    }
  }

  .user-avatar {
    height: 56px;
    width: 56px;
    border: 3px solid $primary;
    border-radius: 50%;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;

    &__image {
      height: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
