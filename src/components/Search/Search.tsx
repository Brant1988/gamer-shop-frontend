import React, { useEffect, useState } from "react";
import { apiClient } from "../../http/axios.config";
import { Product } from "../../types/types";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router";
import "./Search.css";

const API_URL = process.env.REACT_APP_API_URL;

const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebounce(searchValue);
  const navigate = useNavigate();

  const getProducts = async (debounced: string) => {
    const response = await apiClient.get<Product[]>("product", {
      params: {
        name: debounced,
      },
    });
    setProducts(response.data);
  };

  useEffect(() => {
    if (debounced.length < 3) {
      setProducts([]);
      return;
    }
    getProducts(debounced);
  }, [debounced]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleNavigate = (name: string) => {
    navigate("/product/" + name.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase());
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter at least three character"
        value={searchValue}
        onChange={(event) => handleChange(event)}
      />
      <div className="search_result">
        {products.length
          ? products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="found_product"
                  onClick={() => handleNavigate(product.name)}
                >
                  <img
                    src={
                      product.images.length
                        ? API_URL + product.images[0].name
                        : ""
                    }
                    alt=""
                  />
                  <span>{product.brand.name + " " + product.name}</span>
                  <span>{product.oldPrice || ""}</span>
                  <span>{"$" + product.price || ""}</span>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Search;
