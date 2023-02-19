import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getOrders } from "../../helpers/getOrders";
import { authClient } from "../../http/axios.config";
import { QueryKeys } from "../../types/queryKeys";
import { OrdersRoutes } from "../../types/routes";
import { Order } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import OrderCard from "./OrderCard";
import "./OrderHistory.css";

const OrdersHistory: React.FC = () => {
  const {
    data,
    status,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [QueryKeys.orders],
    ({ pageParam = 1 }) => getOrders(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.rows.length !== 0 ? nextPage : undefined;
      },
    }
  );

  const scroller = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");

  const cancelOrder = async (id: string) => {
    try {
      const response = await authClient.patch(OrdersRoutes.PROCESS, {
        id,
        status: "Canceled",
      });
      if (response.status === 200) refetch();
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (
      event: React.UIEvent<HTMLElement>
    ): Promise<void> => {
      event.stopPropagation();
      const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    if (scroller.current)
      scroller.current.addEventListener("scroll", (event: any) =>
        handleScroll(event)
      );
    const cleanUp = scroller.current;
    return () => {
      if (cleanUp)
        cleanUp.removeEventListener("scroll", (event: any) =>
          handleScroll(event)
        );
    };
  }, [fetchNextPage, hasNextPage, scroller]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error")
    return <span>Some error has occured...Try again</span>;

  return (
    <div className="order_history" ref={scroller}>
      <h3>Orders:</h3>
      {data?.pages[0].rows.length ? (
        <>
          <>
            {isSuccess &&
              data?.pages.map((page) => {
                return page.rows.map((order: Order) => {
                  return (
                    <OrderCard
                      cancelOrder={cancelOrder}
                      key={order.id}
                      order={order}
                      error={error}
                    />
                  );
                });
              })}
          </>
          <>{isFetchingNextPage ? <LoadingSpinner /> : ""}</>
        </>
      ) : (
        <span className="error">You have no recent orders</span>
      )}
    </div>
  );
};

export default OrdersHistory;
