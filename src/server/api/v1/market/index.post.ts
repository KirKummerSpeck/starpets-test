import { marketService } from "@/server/services/market/marketService";

import { toProductDTO } from "@/server/utils/mappers/marketMapper";

import type { IGetItemsParams } from "@shared/api/market/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<IGetItemsParams>(event);

  const externalResponse = await marketService.getItems(body);

  const items = externalResponse.items.map(toProductDTO);

  return {
    items,
    count: externalResponse.count,
    currency: externalResponse.currency,
  };
});
