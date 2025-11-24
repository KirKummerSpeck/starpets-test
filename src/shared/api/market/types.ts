export type ProductRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "ultra_rare"
  | "legendary";

export type ProductType = "egg" | "pet" | "potion" | "transport";

export type ProductPumping = "default" | "neon" | "mega_neon";

export type ProductSort = "popularity" | "price";

export interface IProductDTO {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  subtitle: string;

  rarity: ProductRarity;
  type: ProductType;

  gameStats: {
    isNeon: boolean; // Иконка [N]
    isMegaNeon: boolean; // Иконка [M]
    isFlyable: boolean; // Иконка [F]
    isRideable: boolean; // Иконка [R]
  };
}

export interface IMarketResponseDTO {
  items: IProductDTO[];
  total: number;
}

//REQUEST
export interface IGetItemsParams {
  page?: number;
  sort?: ProductSort;
  types?: ProductType[];
  rarities?: ProductRarity[];
  levels?: ProductPumping[];
  flyable?: boolean;
  rideable?: boolean;
  amount?: number;
}
