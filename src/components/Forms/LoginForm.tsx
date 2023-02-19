import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginUser } from "../../store/user/actions";
import { UserDTO } from "../../types/DTO";

interface LoginFormProps {
  isUserSignUp: () => void;
  isSignUp: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isUserSignUp, isSignUp }) => {
  const { error } = useAppSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDTO>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setUserData({
      ...userData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    const { email, password } = userData;
    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userData]);

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <div className="input_error">
        <span>Email</span>
        <span className="error">{error || " "}</span>
      </div>
      <input
        onChange={(event) => handleChange(event)}
        type="text"
        placeholder="example@somemail.com"
        name="email"
        className="email"
        autoComplete="off"
      />
      <span>Password</span>
      <div className="password_container">
        <input
          onChange={(event) => handleChange(event)}
          type={isVisible ? "text" : "password"}
          name="password"
          className="password"
        />
        {isVisible ? (
          <FaEyeSlash onClick={() => setIsVisible(false)} />
        ) : (
          <FaEye onClick={() => setIsVisible(true)} />
        )}
      </div>
      <div className="auth_footer">
        <div>
          <span>
            {isSignUp ? "If you don`t have account:" : "If you have account:"}
          </span>
          <h4 onClick={isUserSignUp}>{isSignUp ? "Sign up" : "Sign in"}</h4>
        </div>
        <button
          disabled={isDisabled}
          className={isDisabled ? "disabled_button" : "active_button"}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
