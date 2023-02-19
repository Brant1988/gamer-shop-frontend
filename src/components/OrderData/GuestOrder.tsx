import React, { useEffect, useState } from "react";
import { validateEmail } from "../../helpers/emailValidation";
import { phoneNumberValidation } from "../../helpers/phoneValidation";
import { apiClient } from "../../http/axios.config";
import { useAppSelector } from "../../store";
import { OrdersDto } from "../../types/DTO";
import { OrdersRoutes } from "../../types/routes";
import { OrderCreateResponse, Shop } from "../../types/types";
import CreateInput from "../Inputs/CreateInput";
import ShopSelection from "./ShopSelection";

interface GuestOrderProps {
  orderCreateSuccess: (id: string) => void;
}

const GuestOrder: React.FC<GuestOrderProps> = ({ orderCreateSuccess }) => {
  const { cart, cartSummary } = useAppSelector((state) => state.cart);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [emailError, setEMailError] = useState<string>("");
  const [phoneError, setphoneError] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [orderPersonalData, setPersonalOrderData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    surname: "",
  });
  const [orderAdressData, setAdressOrderData] = useState({
    city: "",
    country: "",
    postalCode: "",
    adress: "",
  });
  const isPhoneNumberValid = phoneNumberValidation(
    orderPersonalData.phoneNumber
  );
  const isEmailValide = validateEmail(orderPersonalData.email);

  const handlePersonalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setPersonalOrderData({
      ...orderPersonalData,
      [event.target.name]: value,
    });
  };

  const handleAdressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setAdressOrderData({
      ...orderAdressData,
      [event.target.name]: value,
    });
  };

  const postOrder = async (orderData: OrdersDto) => {
    try {
      const response = await apiClient.post<OrderCreateResponse>(
        OrdersRoutes.CREATE,
        {
          ...orderData,
        }
      );
      if (response.status === 200) {
        orderCreateSuccess(response.data.id);
      }
    } catch (error: any) {
      setOrderError(error.response.data.message);
    }
  };

  const handleSubmit = () => {
    const orderData: OrdersDto = {
      email: orderPersonalData.email,
      userName: orderPersonalData.name,
      userSurname: orderPersonalData.surname,
      phone: orderPersonalData.phoneNumber,
      country: orderAdressData.country,
      city: orderAdressData.city,
      adress: orderAdressData.adress,
      postalCode: orderAdressData.postalCode,
      delivery: isDelivery,
      summary: cartSummary.toString(),
      products: [...cart],
    };
    postOrder(orderData);
  };
  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
  };

  useEffect(() => {
    if (!isDelivery && selectedShop) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDelivery, selectedShop]);

  useEffect(() => {
    if (
      isDelivery &&
      orderAdressData.adress &&
      orderAdressData.city &&
      orderAdressData.country &&
      orderPersonalData.email &&
      orderPersonalData.phoneNumber &&
      orderAdressData.postalCode &&
      orderPersonalData.name &&
      orderPersonalData.surname
    ) {
      setIsDisabled(false);
    } else if (!isDelivery && selectedShop) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [orderAdressData, orderPersonalData, isDelivery, selectedShop]);

  useEffect(() => {
    if (!isPhoneNumberValid && orderPersonalData.phoneNumber) {
      setphoneError("Enter correct number");
    } else if (!isEmailValide && orderPersonalData.email) {
      setEMailError("Enter correct Email");
    } else {
      setEMailError("");
      setphoneError("");
    }
  }, [
    orderPersonalData.phoneNumber,
    isPhoneNumberValid,
    isEmailValide,
    orderPersonalData.email,
  ]);
  return (
    <>
      <form className="form">
        <div className="input_error">
          <span>Email</span>
          <span className="error">{emailError}</span>
        </div>
        <CreateInput
          handleChange={handlePersonalChange}
          name={"email"}
          placeHolder={"example@mail.com"}
        />
        <div className="input_error">
          <span>Phone number</span>
          <span className="error">{phoneError}</span>
        </div>
        <CreateInput
          handleChange={handlePersonalChange}
          name={"phoneNumber"}
          placeHolder={"+ (code) number"}
        />
        <span>Name</span>
        <CreateInput handleChange={handlePersonalChange} name={"name"} />
        <span>Surname</span>
        <CreateInput handleChange={handlePersonalChange} name={"surname"} />
      </form>
      <div className="order_button_container">
        <button
          onClick={() => setIsDelivery(false)}
          className={isDelivery ? "disabled_button" : "active_button"}
        >
          Pick up
        </button>
        <button
          onClick={() => setIsDelivery(true)}
          className={isDelivery ? "active_button" : "disabled_button"}
        >
          Delivery
        </button>
      </div>
      <>
        {isDelivery ? (
          <form className="form">
            <span>Country</span>
            <CreateInput handleChange={handleAdressChange} name={"country"} />
            <span>City</span>
            <CreateInput handleChange={handleAdressChange} name={"city"} />
            <span>Adress</span>
            <CreateInput handleChange={handleAdressChange} name={"adress"} />
            <span>Postal code</span>
            <CreateInput
              handleChange={handleAdressChange}
              name={"postalCode"}
            />
          </form>
        ) : (
          <ShopSelection handleShopSelect={handleShopSelect} />
        )}
      </>
      <div className="input_error">
        <span className="error">{orderError}</span>
        <button
          onClick={handleSubmit}
          className={isDisabled ? "disabled_button" : "active_button"}
          disabled={isDisabled}
        >
          Submit order
        </button>
      </div>
    </>
  );
};

export default GuestOrder;
