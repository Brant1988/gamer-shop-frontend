import { apiClient } from "../http/axios.config";
import { ProductRoutes } from "../types/routes";

interface ProductRequest {
  isOnSale: boolean;
}

export const getProducts = async (params: ProductRequest) => {
  const response = await apiClient.get(ProductRoutes.GET, {
    params: {
      ...params,
    },
  });
  return response.data;
};
