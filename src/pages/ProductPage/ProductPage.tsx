import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FaPlus, FaMinus } from "react-icons/fa";
import { cartSlice } from "../../store/cart/cartSlice";
import "./ProductPage.css";
import { shopSlice } from "../../store/shop/shopSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage: React.FC = () => {
  const { products, isLoading } = useAppSelector((state) => state.shop);
  const { selectCategory } = shopSlice.actions;
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const { addToCart, increaseAmount, decreaseAmount } = cartSlice.actions;
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const isInCart = cart.find(
    (cartProduct) => cartProduct.id === products[0].id
  );

  const handleSelect = (index: number) => {
    setSelectedImg(index);
  };
  console.log(products);
  useEffect(() => {
    dispatch(selectCategory(""));
  }, [dispatch, selectCategory]);
  return (
    <div className="product_page">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <img
            className="main_image"
            src={
              products[0]?.images[selectedImg]?.name
                ? API_URL + products[0].images[selectedImg].name
                : ""
            }
            alt=""
          />
          <div className="images_to_select">
            {products[0].images.map((img, index) => {
              return (
                <img
                  key={img.name}
                  onClick={() => handleSelect(index)}
                  src={API_URL + img.name}
                  alt=""
                />
              );
            })}
          </div>
          <div className="description_container">
            <h2>{`${products[0].brand.name} ${products[0].name}`}</h2>
            <ul>
              {products[0].description.split(",").map((desc, index) => {
                return <li key={index}>{desc}</li>;
              })}
            </ul>
            <>
              {isInCart ? (
                <div className="product_footer">
                  <FaPlus
                    onClick={() => dispatch(increaseAmount(products[0].id))}
                  />
                  <span>{isInCart.amount}</span>
                  <FaMinus
                    onClick={() => dispatch(decreaseAmount(products[0].id))}
                  />
                </div>
              ) : (
                <button onClick={() => dispatch(addToCart(products[0]))}>
                  Buy
                </button>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
