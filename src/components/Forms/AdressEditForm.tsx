import React, { useState } from "react";
import { QueryObserverResult } from "react-query";
import { queryClient } from "../..";
import { authClient } from "../../http/axios.config";
import { UserProfileEditDTO } from "../../types/DTO";
import { QueryKeys } from "../../types/queryKeys";
import { UserAdressesRoutes } from "../../types/routes";
import { UserAdressData } from "../../types/types";
import EditInput from "../Inputs/EditInput";

interface AdressEditFormProps {
  data: UserAdressData;
  refetch: () => Promise<QueryObserverResult<UserAdressData, Error>>;
}

const AdressEditForm: React.FC<AdressEditFormProps> = ({ refetch }) => {
  const userAdress = queryClient.getQueryData<UserAdressData>(QueryKeys.adress);
  const [error, setError] = useState<string>("");
  const [adressEditData, setAdressEditData] = useState<UserProfileEditDTO>({
    country: "",
    city: "",
    adress: "",
    postalCode: "",
  });

  const patchUserAdress = async (infoData: UserProfileEditDTO) => {
    try {
      await authClient.patch(UserAdressesRoutes.EDIT, {
        ...infoData,
      });
      refetch();
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  const handleClick = () => {
    if (adressEditData.country) {
      patchUserAdress({ country: adressEditData.country });
    }
    if (adressEditData.city) {
      patchUserAdress({ city: adressEditData.city });
    }
    if (adressEditData.adress) {
      patchUserAdress({ adress: adressEditData.adress });
    }
    if (adressEditData.postalCode) {
      patchUserAdress({ postalCode: adressEditData.postalCode });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAdressEditData({
      ...adressEditData,
      [event.target.name]: value,
    });
  };

  return (
    <>
      <span>{error}</span>
      <EditInput
        name={"Country"}
        value={userAdress?.country || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"country"}
      />
      <EditInput
        name={"City"}
        value={userAdress?.city || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"city"}
      />
      <EditInput
        name={"Adress"}
        value={userAdress?.adress || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"adress"}
      />
      <EditInput
        name={"Postal code"}
        value={userAdress?.postalCode || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"postalCode"}
      />
    </>
  );
};

export default AdressEditForm;
