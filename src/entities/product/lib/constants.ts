import type {
  ProductRarity,
  ProductPumping,
  IGetItemsParams,
} from "@shared/api/market/types";

export interface IRarityOption {
  value: ProductRarity;
  label: string;
}

export interface IPropertyOption {
  value: ProductPumping | "flyable" | "rideable";
  label: string;
  type: "level" | "boolean"; // Чтобы знать, какой метод стора вызывать
}

export const RARITY_OPTIONS: IRarityOption[] = [
  { value: "common", label: "Common" },
  { value: "uncommon", label: "Uncommon" },
  { value: "rare", label: "Rare" },
  { value: "ultra_rare", label: "Ultra Rare" },
  { value: "legendary", label: "Legendary" },
];

// Объединим свойства в один список для удобства верстки,
// или можно оставить раздельно, как в макете.
// В макете: Обычный (default), Неон, Мега-неон, Флай, Райд.
export const PROPERTY_OPTIONS: IPropertyOption[] = [
  { value: "default", label: "Обычный", type: "level" },
  { value: "neon", label: "Неон", type: "level" },
  { value: "mega_neon", label: "Мега-неон", type: "level" },
  { value: "flyable", label: "Флай", type: "boolean" },
  { value: "rideable", label: "Райд", type: "boolean" },
];

export const DEFAULT_FILTERS: IGetItemsParams = {
  page: 1,
  amount: 72,
  sort: "popularity",
  types: [],
  rarities: [],
  levels: [],
  flyable: false,
  rideable: false,
};
