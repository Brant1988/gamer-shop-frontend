import { authClient } from "../http/axios.config";
import { OrdersRoutes } from "../types/routes";

export const getOrders = async (page: number) => {
  const response = await authClient.get(OrdersRoutes.GET, {
    params: {
      page,
    },
  });
  return response.data;
};
