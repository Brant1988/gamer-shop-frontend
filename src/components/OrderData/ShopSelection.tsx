import { useQuery } from "react-query";
import { Shop } from "../../types/types";
import { getShops } from "../../helpers/getShops";
import { useAppSelector } from "../../store";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ShopSelectionProps {
  handleShopSelect: (shop: Shop) => void;
}

const ShopSelection: React.FC<ShopSelectionProps> = ({ handleShopSelect }) => {
  const { status, data } = useQuery<Shop[], Error>(["shop"], getShops);
  const [selectedId, setSelectedId] = useState<string>("");
  const { isMobile } = useAppSelector((state) => state.shop);

  const handleSelect = (shop: Shop) => {
    handleShopSelect(shop);
    setSelectedId(shop.id);
  };

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error") return <span>Some error... Try again</span>;
  return (
    <div className="shops">
      {data?.length ? (
        data.map((shop) => {
          return (
            <div
              className={selectedId === shop.id ? "selected_shop" : "shop"}
              key={shop.id}
              onClick={() => handleSelect(shop)}
            >
              {!isMobile && <span>{shop.country}</span>}
              <div>
                <span>{shop.city}</span>
                <span>{shop.adress}</span>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShopSelection;
