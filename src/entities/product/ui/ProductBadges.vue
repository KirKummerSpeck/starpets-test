<script lang="ts" setup>
import type { IProductDTO } from "@shared/api/market/types";

import { Icon } from "@/shared/ui/Icon";
import NeonIcon from "@/shared/assets/icons/neon.svg?component";
import MegaNeonIcon from "@/shared/assets/icons/mega-neon.svg?component";
import RideIcon from "@/shared/assets/icons/ride.svg?component";
import FlyIcon from "@/shared/assets/icons/fly.svg?component";

interface Props {
  variant?: "vertical" | "horizontal";
  gameStats: IProductDTO["gameStats"];
  size?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "vertical",
  size: "18",
});
</script>

<template>
  <div class="product-badges" :class="[`product-badges--${variant}`]">
    <span v-if="gameStats.isNeon" class="badge badge--neon">
      <Icon :size="size || '18'"><NeonIcon /></Icon>
    </span>
    <span v-if="gameStats.isMegaNeon" class="badge badge--mega"
      ><Icon :size="size || '18'"><MegaNeonIcon /></Icon
    ></span>
    <span v-if="gameStats.isFlyable" class="badge badge--fly"
      ><Icon :size="size || '18'"><FlyIcon /></Icon
    ></span>
    <span v-if="gameStats.isRideable" class="badge badge--ride"
      ><Icon :size="size || '18'"><RideIcon /></Icon
    ></span>
  </div>
</template>

<style lang="scss" scoped>
.product-badges {
  display: flex;
  gap: 4px;
  flex-direction: column;

  &--horizontal {
    flex-direction: row;
  }
}
</style>
