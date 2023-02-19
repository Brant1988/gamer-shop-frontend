import { useAppDispatch, useAppSelector } from "../../store";
import { shopSlice } from "../../store/shop/shopSlice";
import { ProdInfoTitles } from "../../types/types";

interface FilterInfoProps {
  info: ProdInfoTitles;
}

const FilterInfo: React.FC<FilterInfoProps> = ({ info }) => {
  const { selectedDescriptionIds } = useAppSelector((state) => state.shop);
  const { selectDescription } = shopSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <div className="filter_info">
      <h3>{info.name + ":"}</h3>
      <div className="filter_descriptions">
        {info.descriptions.length ? (
          info.descriptions.map((description) => {
            return (
              <span
                onClick={() => dispatch(selectDescription(description.id))}
                className={
                  selectedDescriptionIds.includes(description.id)
                    ? "selected"
                    : "not_selected"
                }
                key={description.id}
              >
                {description.name}
              </span>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FilterInfo;
