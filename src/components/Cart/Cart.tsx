import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { cartSlice } from "../../store/cart/cartSlice";
import { shopSlice } from "../../store/shop/shopSlice";
import "./Cart.css";
import CartProduct from "./CartProduct";

interface CartProps {
  handleCloseCart: () => void;
}

const Cart: React.FC<CartProps> = ({ handleCloseCart }) => {
  const { cart, cartItemsQnty, cartSummary } = useAppSelector(
    (state) => state.cart
  );
  const { selectCategory } = shopSlice.actions;
  const { clearCart } = cartSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOrderClick = () => {
    handleCloseCart();
    dispatch(selectCategory(""));
    navigate("/order");
  };

  const handleClearClick = () => {
    handleCloseCart();
    dispatch(selectCategory(""));
    dispatch(clearCart());
  };
  return (
    <div className="cart_container">
      {cart.length ? (
        <>
          {cart.map((product) => {
            return <CartProduct product={product} key={product.id} />;
          })}
          <div className="cart_total">
            <button className="active_button" onClick={handleOrderClick}>
              Place order
            </button>
            <button className="disabled_button" onClick={handleClearClick}>
              Clear cart
            </button>
            <span>Total:</span>
            <span>{`${cartItemsQnty} psc`}</span>
            <span>{`$ ${cartSummary}`}</span>
          </div>
        </>
      ) : (
        <span className="empty_cart">Cart is empty</span>
      )}
    </div>
  );
};

export default Cart;
