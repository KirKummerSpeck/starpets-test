import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/vue-query";
import type {
  IGetItemsParams,
  IMarketResponseDTO,
} from "@shared/api/market/types";

const TIME = 1000 * 60 * 5;

export const useProducts = (params: Ref<IGetItemsParams>) => {
  const queryClient = useQueryClient();

  const queryKey = computed(() => ["products", params.value]);

  const queryFn = async () => {
    const response = await $fetch<IMarketResponseDTO>("/api/v1/market", {
      method: "POST",
      body: params.value,
    });
    return response;
  };

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: TIME,

    suspense: false,
    placeholderData: keepPreviousData,
  });

  onServerPrefetch(async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKey.value,
      queryFn,
    });
  });

  return query;
};
