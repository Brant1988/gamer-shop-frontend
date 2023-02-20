import React from "react";
import "./NavigationBar.css";
import { Categories } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { shopSlice } from "../../store/shop/shopSlice";
import { fetchProducts } from "../../store/shop/actions";

interface NavigationBarProps {
  isMobile: boolean;
  handleCloseNav: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  isMobile,
  handleCloseNav,
}) => {
  const { setBrands, setInfos, selectCategory, setPage, clearFilters } =
    shopSlice.actions;
  const { selectedCategory, categories } = useAppSelector(
    (state) => state.shop
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  localStorage.clear();
  const handleNavigate = (category: Categories) => {
    if (isMobile) handleCloseNav();
    dispatch(selectCategory(category.id));
    dispatch(setBrands(category.brands));
    dispatch(setInfos(category.prodInfoTitles));
    dispatch(fetchProducts({ categoryId: category.id }));
    dispatch(clearFilters());
    dispatch(setPage(1));
    navigate("/category/" + category.name.toLowerCase());
  };

  return (
    <nav className={isMobile ? "mobile_nav" : ""}>
      <ul>
        {categories.length
          ? categories?.map((category) => {
              return (
                <li
                  className={
                    selectedCategory === category.id
                      ? "selected"
                      : "not_selected"
                  }
                  key={category.id}
                  onClick={() => handleNavigate(category)}
                >
                  {category.name}
                </li>
              );
            })
          : ""}
      </ul>
    </nav>
  );
};

export default NavigationBar;
