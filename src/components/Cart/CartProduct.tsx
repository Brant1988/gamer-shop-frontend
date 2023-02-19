import { FaPlus, FaMinus } from "react-icons/fa";
import { useAppDispatch } from "../../store";
import { cartSlice } from "../../store/cart/cartSlice";
import { Product } from "../../types/types";
import "./Cart.css";

const API_URL = process.env.REACT_APP_API_URL;

interface CartProductProps {
  product: Product;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { increaseAmount, decreaseAmount } = cartSlice.actions;
  return (
    <div className="cart_product">
      <div className="cart_product_img">
        <img
          src={product.images.length ? API_URL + product.images[0].name : ""}
          alt=" "
        />
        <span>{`${product.brand.name} ${product.name.substring(0, 15)}`}</span>
      </div>
      <div className="cart_product_footer">
        <div className="amount_control">
          <FaPlus onClick={() => dispatch(increaseAmount(product.id))} />
          <span>{product.amount && product.amount}</span>
          <FaMinus onClick={() => dispatch(decreaseAmount(product.id))} />
        </div>
        <span>{"$" + product.price * (product.amount || 0)}</span>
      </div>
    </div>
  );
};

export default CartProduct;
