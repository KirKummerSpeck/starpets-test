import type {
  IExternalResponse,
  IExternalRequestPayload,
} from "@/server/models/market/external.contract";

export const marketRepository = {
  async fetchItems(
    payload: IExternalRequestPayload
  ): Promise<IExternalResponse> {
    const config = useRuntimeConfig();

    try {
      const response = await $fetch<IExternalResponse>(config.marketApiUrl, {
        method: "POST",
        body: payload,
      });

      return response;
    } catch (e) {
      console.error("Ошибка запроса:", e);
      throw e;
    }
  },
};
