import { Order } from "../../types/types";
import "./OrderDetails.css";

interface OrderDetailsProps {
  order: Order;
  hideDetails: () => void;
}

const API_URL = process.env.REACT_APP_API_URL;

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, hideDetails }) => {
  return (
    <>
      {order.products.map((product) => {
        return (
          <div className="cart_product">
            <div className="cart_product_img">
              <img
                src={
                  product.images.length ? API_URL + product.images[0].name : ""
                }
                alt=" "
              />
              <span>{`${product.brand.name} ${product.name.substring(
                0,
                15
              )}`}</span>
            </div>
            <div className="cart_product_footer">
              <span>{`${product.amount.amount} psc`}</span>
              <span>{`$ ${product.price}`}</span>
            </div>
          </div>
        );
      })}
      <div className="details_footer">
        <h4>Name:</h4>
        <span>{order.userName}</span>
      </div>
      <div className="details_footer">
        <h4>Surname:</h4>
        <span>{order.userSurname}</span>
      </div>
      <div className="details_footer">
        <h4>Phone:</h4>
        <span>{order.phone}</span>
      </div>
      <div className="details_footer">
        <h4>Delivery:</h4>
        <span>{order.delivery ? "Yes" : "No"}</span>
      </div>
      <div className="details_footer">
        <h4>Country:</h4>
        <span>{order.country}</span>
      </div>
      <div className="details_footer">
        <h4>City:</h4>
        <span>{order.city}</span>
      </div>
      <div className="details_footer">
        <h4>Adress:</h4>
        <span>{order.adress}</span>
      </div>
      <div className="details_footer">
        <button onClick={hideDetails} className="hide_button">
          Hide
        </button>
      </div>
    </>
  );
};

export default OrderDetails;
