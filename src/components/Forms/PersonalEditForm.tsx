import React, { useState } from "react";
import { QueryObserverResult } from "react-query";
import { queryClient } from "../..";
import { authClient } from "../../http/axios.config";
import { UserProfileEditDTO } from "../../types/DTO";
import { QueryKeys } from "../../types/queryKeys";
import { UserPersonalRoutes } from "../../types/routes";
import { UserPersonalData } from "../../types/types";
import EditInput from "../Inputs/EditInput";

interface UserPersonalProps {
  refetch: () => Promise<QueryObserverResult<UserPersonalData, Error>>;
}

const PersonalEditForm: React.FC<UserPersonalProps> = ({ refetch }) => {
  const userInfo = queryClient.getQueryData<UserPersonalData>(
    QueryKeys.personal
  );
  const [infoEditData, setInfoEditData] = useState<UserProfileEditDTO>({
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string>("");
  const patchUserInfo = async (infoData: UserProfileEditDTO) => {
    try {
      await authClient.patch(UserPersonalRoutes.EDIT, {
        ...infoData,
      });
      refetch();
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  const handleClick = () => {
    if (infoEditData.name) {
      patchUserInfo({ name: infoEditData.name });
    }
    if (infoEditData.surname) {
      patchUserInfo({ surname: infoEditData.surname });
    }
    if (infoEditData.phoneNumber) {
      patchUserInfo({ phoneNumber: infoEditData.phoneNumber });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInfoEditData({
      ...infoEditData,
      [event.target.name]: value,
    });
  };

  return (
    <>
      <span>{error}</span>
      <EditInput
        name={"Name"}
        value={userInfo?.name || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"name"}
      />
      <EditInput
        name={"Surname"}
        value={userInfo?.surname || ""}
        handleChange={handleChange}
        handleEdit={handleClick}
        changeValue={"surname"}
      />
      <EditInput
        name={"Phone number"}
        value={userInfo?.phoneNumber || ""}
        changeValue={"phoneNumber"}
        handleChange={handleChange}
        handleEdit={handleClick}
      />
    </>
  );
};

export default PersonalEditForm;
