import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store";
import { registerUser } from "../../store/user/actions";
import { UserDTO } from "../../types/DTO";
import { validateEmail } from "../../helpers/emailValidation";

interface RegisterFromProps {
  isUserSignUp: () => void;
  isSignUp: boolean;
}

const RegisterFrom: React.FC<RegisterFromProps> = ({
  isUserSignUp,
  isSignUp,
}) => {
  const [passwordError, setPasswordError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { error } = useAppSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [userData, setUserData] = useState<UserDTO>({
    email: "",
    password: "",
  });
  const isEmailValide = validateEmail(userData.email);
  const dispatch = useAppDispatch();

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

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
    dispatch(registerUser(userData));
  };
  useEffect(() => {
    if (!userData.password || !confirmPassword?.length) setPasswordError("");
    if (
      userData.password &&
      confirmPassword?.length &&
      userData.password !== confirmPassword
    )
      setPasswordError("Password is not confirmed");
    if (userData.password.length && userData.password.length < 4)
      setPasswordError("Password has to be longer");
    if (userData.password.length && userData.password.length > 50)
      setPasswordError("Password has to be shorter");
    if (userData.password === confirmPassword) setPasswordError("");
  }, [userData.password, confirmPassword]);

  useEffect(() => {
    if (!userData.email.length || isEmailValide) setEmailError("");
    if (userData.email.length && !isEmailValide)
      setEmailError("Email is incorrect");
  }, [userData.email, isEmailValide]);

  useEffect(() => {
    const { email, password } = userData;
    if (email && password && isEmailValide && password === confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userData, isEmailValide, confirmPassword]);

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <div className="input_error">
        <span>Email</span>
        <span className="error">{emailError || error}</span>
      </div>
      <input
        onChange={(event) => handleChange(event)}
        type="text"
        placeholder="example@somemail.com"
        name="email"
        className="email"
        autoComplete="off"
      />
      <div className="input_error">
        <span>Password</span>
        <span className="error">{passwordError}</span>
      </div>
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
      <span>Confirm password</span>
      <div className="password_container">
        <input
          onChange={(event) => handleConfirmChange(event)}
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
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterFrom;
