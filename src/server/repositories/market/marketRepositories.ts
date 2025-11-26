import type {
  IExternalResponse,
  IExternalRequestPayload,
} from "@/server/models/market/external.contract";

import { MARKET_ENDPOINTS } from "@/server/utils/apiEndpoints.ts";

export const marketRepository = {
  async fetchItems(
    payload: IExternalRequestPayload
  ): Promise<IExternalResponse> {
    const config = useRuntimeConfig();

    try {
      const response = await $fetch<IExternalResponse>(
        `${config.marketApiBaseUrl}${MARKET_ENDPOINTS.FETCH_ITEMS}`,
        {
          method: "POST",
          body: payload,
        }
      );

      return response;
    } catch (e) {
      console.error("Ошибка запроса:", e);
      throw e;
    }
  },
};
