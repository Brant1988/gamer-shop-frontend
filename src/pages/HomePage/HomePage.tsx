import React, { useEffect } from "react";
import "./HomePage.css";
import { Product } from "../../types/types";
import { useQuery } from "react-query";
import { useAppDispatch } from "../../store";
import { shopSlice } from "../../store/shop/shopSlice";
import { fetchProducts } from "../../store/shop/actions";
import { useNavigate } from "react-router";
import { getProducts } from "../../helpers/getProducts";
import { QueryKeys } from "../../types/queryKeys";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const API_URL = process.env.REACT_APP_API_URL;

const HomePage: React.FC = () => {
  const { status, data } = useQuery<Product[], Error>(
    [QueryKeys.products],
    () => getProducts({ isOnSale: true }),
    { refetchInterval: 5000 }
  );

  const { selectCategory } = shopSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (id: string, name: string) => {
    dispatch(fetchProducts({ id }));
    navigate("/product/" + name.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase());
  };

  useEffect(() => {
    dispatch(selectCategory(""));
  }, [dispatch, selectCategory]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error")
    return <span id="loading">Some Error has occurred... Try again</span>;

  return (
    <>
      {data?.length ? (
        <>
          {data.map((product) => {
            return (
              <div className="home_page" key={product.id}>
                <img
                  src={
                    product.images.length
                      ? API_URL + product.images[0].name
                      : ""
                  }
                  alt="Best Product"
                />
                <div className="main_description">
                  <span>{`${product.brand.name} ${product.name}`}</span>
                  <ul>
                    {product.description.split(",").map((desc, index) => {
                      return <li key={index}>{desc}</li>;
                    })}
                  </ul>
                  <button onClick={() => handleClick(product.id, product.name)}>
                    Learn more...
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default HomePage;
