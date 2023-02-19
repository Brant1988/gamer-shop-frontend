import React, { useEffect, useState } from "react";
import { authClient } from "../../http/axios.config";
import { useAppDispatch } from "../../store";
import { userSlice } from "../../store/user/userSlice";
import { UserAdressDTO } from "../../types/DTO";
import { UserAdressesRoutes } from "../../types/routes";
import CreateInput from "../Inputs/CreateInput";
import "./Forms.css";

const UserAdressForm: React.FC = () => {
  const { logOut } = userSlice.actions;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [userAdress, setUserAdress] = useState<UserAdressDTO>({
    city: "",
    country: "",
    postalCode: "",
    adress: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserAdress({
      ...userAdress,
      [event.target.name]: value,
    });
  };

  const postUserAdress = async (userAdress: UserAdressDTO) => {
    try {
      await authClient.post(UserAdressesRoutes.CREATE, {
        ...userAdress,
      });
    } catch (error) {
      dispatch(logOut());
    }
  };
  const handleSubmit = () => {
    postUserAdress(userAdress);
  };

  useEffect(() => {
    if (
      userAdress.city &&
      userAdress.country &&
      userAdress.adress &&
      userAdress.postalCode
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userAdress]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>Country</span>
      <CreateInput handleChange={handleChange} name={"country"} />
      <span>City</span>
      <CreateInput handleChange={handleChange} name={"city"} />
      <span>Adress</span>
      <CreateInput handleChange={handleChange} name={"adress"} />
      <span>Postal code</span>
      <CreateInput handleChange={handleChange} name={"postalCode"} />
      <button
        onClick={handleSubmit}
        className={isDisabled ? "disabled_button" : "active_button"}
      >
        Submit
      </button>
    </form>
  );
};

export default UserAdressForm;
