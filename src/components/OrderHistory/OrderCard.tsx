import { useState } from "react";
import { Order } from "../../types/types";
import OrderDetails from "../OrderDetails/OrderDetails";

interface OrderCardProps {
  error: string;
  order: Order;
  cancelOrder: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ error, order, cancelOrder }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const hideDetails = () => {
    setShowDetails(false);
  };

  const date = new Date(order.createdAt);
  const formatedDate =
    date.getMonth() + " - " + date.getDate() + " - " + date.getFullYear();
  return (
    <div className="order_card">
      {showDetails ? (
        <OrderDetails order={order} hideDetails={hideDetails} />
      ) : (
        <>
          <div className="order_card_content">
            <h4>Order №:</h4>
            <span>{order.id}</span>
          </div>
          <div className="order_card_content">
            <h4>Date:</h4>
            <span>{formatedDate}</span>
          </div>
          <div className="order_card_content">
            <h4>Summary:</h4>
            <span>{`$ ${order.summary}`}</span>
          </div>
          <div className="order_card_content">
            <h4>Status:</h4>
            <span>{order.status}</span>
          </div>
          <div className="order_card_content">
            <button
              className="active_button"
              onClick={() => setShowDetails(true)}
            >
              Details
            </button>
            <span className="error">{error}</span>
            <button
              className="active_button"
              onClick={() => cancelOrder(order.id)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCard;
