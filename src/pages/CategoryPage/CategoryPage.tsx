import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import ProductsList from "../../components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts } from "../../store/shop/actions";
import { shopSlice } from "../../store/shop/shopSlice";
import "./CategoryPage.css";

const CategoryPage: React.FC = () => {
  const { selectedCategory, categories } = useAppSelector(
    (state) => state.shop
  );
  const { selectCategory, setBrands, setInfos } = shopSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryName = useParams();

  useEffect(() => {
    dispatch(fetchProducts({ categoryId: selectedCategory }));
  }, [selectedCategory, navigate, dispatch]);

  useEffect(() => {
    const categoryTofind = categories.find(
      (category) => category.name.toLowerCase() === categoryName.name
    );

    if (categoryTofind && categoryTofind.id !== selectedCategory) {
      dispatch(selectCategory(categoryTofind.id));
      dispatch(setBrands(categoryTofind.brands));
      dispatch(setInfos(categoryTofind.prodInfoTitles));
    }
  }, [
    categoryName,
    selectedCategory,
    navigate,
    dispatch,
    categories,
    setBrands,
    setInfos,
    selectCategory,
  ]);

  return (
    <div className="category_page">
      <FilterBar />
      <div className="products_container">
        <ProductsList />
        <Pagination />
      </div>
    </div>
  );
};

export default CategoryPage;
