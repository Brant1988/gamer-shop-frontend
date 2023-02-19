import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.css";
import { shopSlice } from "../../store/shop/shopSlice";

const Pagination: React.FC = () => {
  const { totalProductQnty, page } = useAppSelector((state) => state.shop);
  const { setPage } = shopSlice.actions;
  const [pages, setPages] = useState<number>(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const limit = 6;
    setPages(Math.ceil(totalProductQnty / limit));
  }, [totalProductQnty]);

  return (
    <div className="pagination">
      <div className="page_container" onClick={() => dispatch(setPage(1))}>
        <FaArrowLeft />
      </div>
      {Array.from({ length: pages }, (_, i) => i + 1).map((element) => {
        return (
          <div
            key={element}
            className="page_container"
            onClick={() => dispatch(setPage(element))}
          >
            <span
              className={
                element === page ? "selected_page" : "not_selected_page"
              }
            >
              {element}
            </span>
          </div>
        );
      })}
      <div className="page_container" onClick={() => dispatch(setPage(pages))}>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
