import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { userSlice } from "../../store/user/userSlice";
import { useNavigate } from "react-router";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterFrom from "../../components/Forms/RegisterForm";

const AuthPage: React.FC = () => {
  const { clearError } = userSlice.actions;
  const { user } = useAppSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserSignUp = () => {
    dispatch(clearError());
    setIsSignUp((prev) => !prev);
  };

  useEffect(() => {
    if (user) navigate(-1);
  }, [user, navigate]);

  return (
    <div className="auth_page">
      {isSignUp ? (
        <LoginForm isUserSignUp={isUserSignUp} isSignUp={isSignUp} />
      ) : (
        <RegisterFrom isUserSignUp={isUserSignUp} isSignUp={isSignUp} />
      )}
    </div>
  );
};

export default AuthPage;
