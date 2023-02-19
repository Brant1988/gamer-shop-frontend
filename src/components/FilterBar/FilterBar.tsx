import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store";
import { shopSlice } from "../../store/shop/shopSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./FilterBar.css";
import FilterInfo from "./ProductInfo";

const FilterBar: React.FC = () => {
  const { productInfos, brands, isMobile, selectedBrandIds } = useAppSelector(
    (state) => state.shop
  );
  const { selectBrand } = shopSlice.actions;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <>
      {isMobile ? (
        <FaFilter className="filter_icon" onClick={() => setShowFilter(true)} />
      ) : (
        ""
      )}
      {showFilter || !isMobile ? (
        <div className={isMobile ? "modile_filter_bar" : "filter_bar"}>
          {brands.length && productInfos.length ? (
            <>
              <>
                <h3>Brands:</h3>
                {isMobile ? (
                  <FaTimes
                    onClick={() => setShowFilter(false)}
                    className="gray_svg"
                  />
                ) : (
                  ""
                )}
              </>
              <div className="filter_brands">
                {brands.map((brand) => {
                  return (
                    <span
                      onClick={() => dispatch(selectBrand(brand.id))}
                      className={
                        selectedBrandIds.includes(brand.id)
                          ? "selected"
                          : "not_selected"
                      }
                      key={brand.id}
                    >
                      {brand.name}
                    </span>
                  );
                })}
              </div>
              <div className="filter_infos">
                {productInfos.map((info) => {
                  return <FilterInfo key={info.id} info={info} />;
                })}
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FilterBar;
