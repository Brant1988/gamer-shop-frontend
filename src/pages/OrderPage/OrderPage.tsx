import "./OrderPage.css";
import CartProduct from "../../components/Cart/CartProduct";
import { useAppDispatch, useAppSelector } from "../../store";
import UserOrder from "../../components/OrderData/UserOrder";
import GuestOrder from "../../components/OrderData/GuestOrder";
import { useState } from "react";
import { useNavigate } from "react-router";
import { cartSlice } from "../../store/cart/cartSlice";

const OrderPage: React.FC = () => {
  const { cart, cartItemsQnty, cartSummary } = useAppSelector(
    (state) => state.cart
  );
  const { user } = useAppSelector((state) => state.user);
  const { clearCart } = cartSlice.actions;
  const [isOrderCreated, setIsOrderCreated] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderCreateSuccess = (id: string) => {
    dispatch(clearCart());
    setIsOrderCreated(true);
    setOrderId(id);
  };

  return (
    <div className={isOrderCreated ? "success_order" : "order_page"}>
      <>
        {isOrderCreated ? (
          <>
            <div>
              <span>Order №</span>
              <span className="order_span">{orderId}</span>
              <span>Has been created</span>
            </div>
            <button onClick={() => navigate("home")} className="active_button">
              Home
            </button>
          </>
        ) : (
          <>
            {cart.length ? (
              <>
                <div className="cart_order">
                  <h2>Order:</h2>
                  {cart.length &&
                    cart.map((product) => {
                      return <CartProduct key={product.id} product={product} />;
                    })}
                  <div className="cart_total">
                    <span>Total:</span>
                    <span>{`${cartItemsQnty} psc`}</span>
                    <span>{`$ ${cartSummary}`}</span>
                  </div>
                </div>
                <div className="order_info">
                  {user ? (
                    <UserOrder orderCreateSuccess={orderCreateSuccess} />
                  ) : (
                    <GuestOrder orderCreateSuccess={orderCreateSuccess} />
                  )}
                </div>
              </>
            ) : (
              <span>Cart is empty, add some products</span>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default OrderPage;
