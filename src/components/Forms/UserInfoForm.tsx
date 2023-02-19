import React, { useEffect, useState } from "react";
import { UserInfoDTO } from "../../types/DTO";
import { authClient } from "../../http/axios.config";
import { UserPersonalRoutes } from "../../types/routes";
import { useAppDispatch } from "../../store";
import { userSlice } from "../../store/user/userSlice";
import { phoneNumberValidation } from "../../helpers/phoneValidation";
import "./Forms.css";
import CreateInput from "../Inputs/CreateInput";

const UserInfoForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoDTO>({
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const { logOut } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const isPhoneNumberValid = phoneNumberValidation(userInfo.phoneNumber);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [event.target.name]: value,
    });
  };

  const postUserInfo = async (userInfo: UserInfoDTO) => {
    try {
      await authClient.post(UserPersonalRoutes.CREATE, {
        ...userInfo,
      });
    } catch (error) {
      dispatch(logOut());
    }
  };
  const handleSubmit = () => {
    postUserInfo(userInfo);
  };

  useEffect(() => {
    if (
      userInfo.name &&
      userInfo.surname &&
      userInfo.phoneNumber &&
      isPhoneNumberValid
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userInfo, isPhoneNumberValid]);

  useEffect(() => {
    if (!isPhoneNumberValid && userInfo.phoneNumber.length) {
      setError("Enter correct number");
    } else {
      setError("");
    }
  }, [userInfo.phoneNumber, isPhoneNumberValid]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>Name</span>
      <CreateInput handleChange={handleChange} name={"name"} />
      <span>Surname</span>
      <CreateInput handleChange={handleChange} name={"surname"} />
      <div className="input_error">
        <span>Phone number</span>
        <span className="error">{error}</span>
      </div>
      <CreateInput
        handleChange={handleChange}
        name={"phoneNumber"}
        placeHolder={"+ (code) number"}
      />
      <button
        onClick={handleSubmit}
        className={isDisabled ? "disabled_button" : "active_button"}
      >
        Submit
      </button>
    </form>
  );
};

export default UserInfoForm;
