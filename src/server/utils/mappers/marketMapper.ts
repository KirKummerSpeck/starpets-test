import { formatString } from "@shared/lib/formatters/string";
import type { IExternalItem } from "@/server/models/market/external.contract";
import type { IProductDTO } from "@shared/api/market/types";

export const toProductDTO = (raw: IExternalItem): IProductDTO => {
  return {
    id: raw.goodId,
    title: raw.name,
    price: raw.price,
    imageUrl: raw.imageUri,
    subtitle: formatString(raw.age) || "",

    rarity: raw.rare,
    type: raw.type,

    gameStats: {
      isNeon: raw.pumping === "neon",
      isMegaNeon: raw.pumping === "mega_neon",
      isFlyable: raw.flyable,
      isRideable: raw.rideable,
    },
  };
};
