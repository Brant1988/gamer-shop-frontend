import { Product } from "../../types/types";
import { cartSlice } from "../../store/cart/cartSlice";
import "./ProductCard.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { FaPlus, FaMinus } from "react-icons/fa";
import { fetchProducts } from "../../store/shop/actions";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
}

const API_URL = process.env.REACT_APP_API_URL;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, increaseAmount, decreaseAmount } = cartSlice.actions;
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isInCart = cart.find((cartProduct) => cartProduct.id === product.id);

  const handleClick = (id: string, name: string) => {
    dispatch(fetchProducts({ id }));
    navigate("/product/" + name.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase());
  };

  return (
    <div className="product_card">
      <img
        onClick={() => handleClick(product.id, product.name)}
        src={product.images.length ? API_URL + product.images[0].name : ""}
        alt={product.name}
      />
      <div className="product_card_info">
        <h4>{product.brand.name + " " + product.name}</h4>
        <p>{product.description.substring(0, 180) + "..."}</p>
      </div>
      <div className="product_card_footer">
        <div className="product_card_price">
          {product.oldPrice && (
            <h4 className="old_price">{"$" + product.oldPrice || ""}</h4>
          )}
          <h4>{"$" + product.price}</h4>
        </div>
        {isInCart ? (
          <div className="amount_control">
            <FaPlus onClick={() => dispatch(increaseAmount(product.id))} />
            <span>{isInCart.amount}</span>
            <FaMinus onClick={() => dispatch(decreaseAmount(product.id))} />
          </div>
        ) : (
          <button onClick={() => dispatch(addToCart(product))}>Buy</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
