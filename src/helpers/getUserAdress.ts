import { authClient } from "../http/axios.config";
import { UserAdressesRoutes } from "../types/routes";
import { UserAdressData } from "../types/types";

export const getUserAdress = async () => {
  const response = await authClient.get<UserAdressData>(UserAdressesRoutes.GET);
  return response.data;
};
