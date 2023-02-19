import React from "react";
import "./UserInfo.css";
import { UserAdressData } from "../../types/types";
import UserAdressForm from "../Forms/UserAdressForm";
import AdressEditForm from "../Forms/AdressEditForm";
import { useQuery } from "react-query";
import { getUserAdress } from "../../helpers/getUserAdress";
import { QueryKeys } from "../../types/queryKeys";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UserAdress: React.FC = () => {
  const { data, status, refetch } = useQuery<UserAdressData, Error>({
    queryKey: [QueryKeys.adress],
    queryFn: getUserAdress,
  });
  if (status === "loading") return <LoadingSpinner />;
  if (status === "error")
    return <span>Some error has occured...Try again</span>;

  return (
    <div className="user_info">
      <h3>Adress:</h3>
      {data ? (
        <AdressEditForm data={data} refetch={refetch} />
      ) : (
        <UserAdressForm />
      )}
    </div>
  );
};

export default UserAdress;
