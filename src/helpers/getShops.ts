import { apiClient } from "../http/axios.config";
import { ShopRoutes } from "../types/routes";

export const getShops = async () => {
  const response = await apiClient.get(ShopRoutes.GET);
  return response.data;
};
