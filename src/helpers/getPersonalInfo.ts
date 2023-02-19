import { authClient } from "../http/axios.config";
import { UserPersonalRoutes } from "../types/routes";
import { UserPersonalData } from "../types/types";

export const getPersonalInfo = async () => {
  const response = await authClient.get<UserPersonalData>(
    UserPersonalRoutes.GET
  );
  return response.data;
};
