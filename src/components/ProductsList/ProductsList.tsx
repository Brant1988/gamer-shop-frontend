import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts } from "../../store/shop/actions";
import { shopSlice } from "../../store/shop/shopSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

const ProductsList: React.FC = () => {
  const {
    products,
    isLoading,
    selectedBrandIds,
    selectedCategory,
    selectedDescriptionIds,
    categories,
    page,
  } = useAppSelector((state) => state.shop);
  const { selectCategory, clearFilters } = shopSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedCategory) return;
    if (selectedBrandIds.length && selectedDescriptionIds.length) {
      dispatch(
        fetchProducts({
          categoryId: selectedCategory,
          descriptionIds: selectedDescriptionIds,
          brandId: selectedBrandIds,
          page: 1,
        })
      );
    } else if (selectedBrandIds.length) {
      dispatch(
        fetchProducts({
          categoryId: selectedCategory,
          brandId: selectedBrandIds,
          page: 1,
        })
      );
    } else if (selectedDescriptionIds.length) {
      dispatch(
        fetchProducts({
          categoryId: selectedCategory,
          descriptionIds: selectedDescriptionIds,
          page: 1,
        })
      );
    } else {
      dispatch(fetchProducts({ categoryId: selectedCategory, page }));
    }
  }, [
    selectedBrandIds,
    selectedDescriptionIds,
    selectedCategory,
    dispatch,
    page,
  ]);

  useEffect(() => {
    if (selectedCategory) return;
    const categoryName = window.location.href.split("/").slice(-1).join();
    const foundCategory = categories.find(
      (category) => category.name === categoryName
    );
    if (foundCategory?.id) dispatch(selectCategory(foundCategory.id));
  }, [selectedCategory, dispatch, selectCategory, categories]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {products.length && !isLoading ? (
            <>
              <div className="products_list">
                {products.map((product) => {
                  return <ProductCard product={product} key={product.id} />;
                })}
              </div>
            </>
          ) : (
            <div className="not_found">
              <h3>Products not found...</h3>
              <h3>Try to</h3>
              <h3
                className="reset_filter"
                onClick={() => dispatch(clearFilters())}
              >
                reset
              </h3>
              <h3>or change filters</h3>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsList;
