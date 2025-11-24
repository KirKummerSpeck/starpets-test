import type {
  ProductRarity,
  ProductType,
  ProductPumping,
} from "@shared/api/market/types";

//FILTER
// 1. Свойства (только для type: pet)
export interface IFilterProperties {
  missing: boolean; // По ТЗ "всегда true"
  flyable?: boolean;
  rideable?: boolean;
}

export interface IFilterTypeItem {
  type: ProductType;
  rarities?: ProductRarity[]; // Может быть у любого типа
  levels?: ProductPumping[]; // Только у pet
  properties?: IFilterProperties; // Только у pet
}

export interface IExternalFilter {
  types: IFilterTypeItem[];
}

export interface IExternalRequestPayload {
  filter: IExternalFilter;
  page: number;
  amount: number;
  currency: "usd";
  sort: Partial<Record<"popularity" | "price", "desc">>;
}

// RESPONSE
export interface IExternalItem {
  id: number;
  goodId: string;
  name: string;
  type: ProductType;
  realName: string;
  imageId: string;
  imageUri: string;
  subtype: string | null;
  age: string | null;
  rare: ProductRarity;
  pumping: ProductPumping | null;
  flyable: boolean;
  rideable: boolean;
  price: number;
  avgPrice: number;
}

export interface IExternalResponse {
  status: boolean;
  items: IExternalItem[];
  count: number;
  currency: string;
  _source?: number;
}
