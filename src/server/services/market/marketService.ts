import { marketRepository } from "@/server/repositories/market";

import type {
  IFilterTypeItem,
  IExternalRequestPayload,
} from "@/server/models/market/external.contract";

import type { IGetItemsParams, ProductType } from "@shared/api/market/types";

import { PRODUCT_TYPES, ALL_PRODUCT_TYPES } from "@shared/api/market/constants";

export const marketService = {
  async getItems(params: IGetItemsParams) {
    const targetTypes: ProductType[] =
      params.types && params.types.length > 0
        ? params.types
        : ALL_PRODUCT_TYPES;

    const typesPayload: IFilterTypeItem[] = targetTypes.map((type) => {
      const item: IFilterTypeItem = { type };

      if (params.rarities && params.rarities.length > 0) {
        item.rarities = params.rarities;
      }

      if (type === PRODUCT_TYPES.PET) {
        if (params.levels && params.levels.length > 0) {
          item.levels = params.levels;
        }

        if (params.flyable || params.rideable) {
          item.properties = {
            missing: true,
            flyable: params.flyable || false,
            rideable: params.rideable || false,
          };
        }
      }

      return item;
    });

    const payload: IExternalRequestPayload = {
      page: params.page || 1,
      amount: params.amount || 72,
      currency: "usd",
      sort: {
        [params.sort || "popularity"]: "desc",
      },
      filter: {
        types: typesPayload,
      },
    };

    return await marketRepository.fetchItems(payload);
  },
};
