import React from "react";
import "./UserInfo.css";
import UserInfoFrom from "../Forms/UserInfoForm";
import { UserPersonalData } from "../../types/types";
import { useQuery } from "react-query";
import { getPersonalInfo } from "../../helpers/getPersonalInfo";
import PersonalEditForm from "../Forms/PersonalEditForm";
import { QueryKeys } from "../../types/queryKeys";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UserPersonalInfo: React.FC = () => {
  const { data, status, refetch } = useQuery<UserPersonalData, Error>({
    queryKey: [QueryKeys.personal],
    queryFn: getPersonalInfo,
  });
  if (status === "loading") return <LoadingSpinner />;
  if (status === "error")
    return <span>Some error has occured...Try again</span>;
  return (
    <div className="user_info">
      <h3>Personal Info:</h3>
      {data ? (
        <>
          <PersonalEditForm refetch={refetch} />
        </>
      ) : (
        <>
          <UserInfoFrom />
        </>
      )}
    </div>
  );
};

export default UserPersonalInfo;
