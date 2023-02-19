import { useEffect, useState } from "react";
import { queryClient } from "../..";
import { authClient } from "../../http/axios.config";
import { useAppSelector } from "../../store";
import { OrdersDto } from "../../types/DTO";
import { QueryKeys } from "../../types/queryKeys";
import { OrdersRoutes } from "../../types/routes";
import {
  OrderCreateResponse,
  Shop,
  UserAdressData,
  UserPersonalData,
} from "../../types/types";
import UserAdress from "../UserInfo/UserAdress";
import UserPersonalInfo from "../UserInfo/UserPersonalInfo";
import ShopSelection from "./ShopSelection";

interface UserOrderProps {
  orderCreateSuccess: (id: string) => void;
}

const UserOrder: React.FC<UserOrderProps> = ({ orderCreateSuccess }) => {
  const userInfo = queryClient.getQueryData<UserPersonalData>(
    QueryKeys.personal
  );
  const userAdress = queryClient.getQueryData<UserAdressData>(QueryKeys.adress);
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [orderError, setOrderError] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { cart, cartSummary } = useAppSelector((state) => state.cart);

  const postOrder = async (orderData: OrdersDto) => {
    try {
      const response = await authClient.post<OrderCreateResponse>(
        OrdersRoutes.CREATE_AUTH,
        {
          ...orderData,
        }
      );
      if (response.status === 200) {
        orderCreateSuccess(response.data.id);
      }
    } catch (error: any) {
      setOrderError(error.data.message);
    }
  };

  const handleSubmit = () => {
    if (!userInfo || !userAdress) return;
    let orderData: OrdersDto;
    if (isDelivery) {
      orderData = {
        phone: userInfo.phoneNumber,
        userName: userInfo.name,
        userSurname: userInfo.name,
        country: userAdress.country,
        city: userAdress.city,
        adress: userAdress.adress,
        postalCode: userAdress.postalCode,
        delivery: isDelivery,
        summary: cartSummary.toString(),
        products: cart,
      };
      postOrder(orderData);
    }
    if (!isDelivery && selectedShop) {
      orderData = {
        phone: userInfo.phoneNumber,
        userName: userInfo.name,
        userSurname: userInfo.name,
        country: selectedShop.country,
        city: selectedShop.city,
        adress: selectedShop.adress,
        postalCode: selectedShop.postalCode,
        delivery: isDelivery,
        summary: cartSummary.toString(),
        products: cart,
      };
      postOrder(orderData);
    }
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
  };

  useEffect(() => {
    if (!isDelivery && !selectedShop) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isDelivery, selectedShop]);

  return (
    <>
      <UserPersonalInfo />
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
        {!isDelivery ? (
          <ShopSelection handleShopSelect={handleShopSelect} />
        ) : (
          <UserAdress />
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

export default UserOrder;
