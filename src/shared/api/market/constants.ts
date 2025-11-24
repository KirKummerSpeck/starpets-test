import type { ProductType } from "@shared/api/market/types";

export const PRODUCT_TYPES: Record<string, ProductType> = {
  PET: "pet",
  EGG: "egg",
  POTION: "potion",
  TRANSPORT: "transport",
} as const;

export const ALL_PRODUCT_TYPES = Object.values(PRODUCT_TYPES);
