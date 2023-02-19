import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import OrdersHistory from "../../components/OrderHistory/OrdersHistory";
import UserAdress from "../../components/UserInfo/UserAdress";
import UserPersonalInfo from "../../components/UserInfo/UserPersonalInfo";
import { useAppDispatch } from "../../store";
import { shopSlice } from "../../store/shop/shopSlice";
import "./PersonalPage.css";

const PersonalPage: React.FC = () => {
  const { selectCategory } = shopSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(selectCategory(""));
  }, [dispatch, selectCategory]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth");
  }, [navigate]);

  return (
    <div className="personal_page">
      <div className="personal_info_container">
        <UserPersonalInfo />
        <UserAdress />
      </div>
      <OrdersHistory />
    </div>
  );
};

export default PersonalPage;
