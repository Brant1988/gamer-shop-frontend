import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../utils/image/logo.png";
import {
  FaSearch,
  FaShoppingCart,
  FaUserAltSlash,
  FaUser,
  FaUserCog,
  FaTimes,
  FaAlignJustify,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchCategories } from "../../store/shop/actions";
import { userSlice } from "../../store/user/userSlice";
import Cart from "../Cart/Cart";
import NavigationBar from "../NavigationBar/NavigationBar";
import Search from "../Search/Search";
import { cartSlice } from "../../store/cart/cartSlice";

const Header: React.FC = () => {
  const { logOut } = userSlice.actions;
  const { clearCart } = cartSlice.actions;
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const { isMobile } = useAppSelector((state) => state.shop);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseNav = () => {
    setShowNav(false);
  };
  const handleLogOut = () => {
    dispatch(clearCart());
    dispatch(logOut());
    navigate("/");
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleShowCart = () => {
    if (isMobile) setShowNav(false);
    setShowSearch(false);
    setShowCart(true);
  };

  const handleShowNav = () => {
    setShowSearch(false);
    setShowCart(false);
    setShowNav(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <div className="nav_container">
          <>
            {isMobile ? (
              <>
                {showNav ? (
                  <FaTimes
                    className="cross_svg"
                    onClick={() => setShowNav(false)}
                  />
                ) : (
                  <FaAlignJustify
                    className="gray_svg"
                    onClick={handleShowNav}
                  />
                )}
              </>
            ) : (
              <img src={logo} alt="LOGO" onClick={() => navigate("/")} />
            )}
            <>
              {isMobile ? (
                <img src={logo} alt="LOGO" onClick={() => navigate("/")} />
              ) : (
                ""
              )}
            </>
          </>
          {showSearch ? (
            <Search />
          ) : (
            <>
              {showNav || !isMobile ? (
                <NavigationBar
                  isMobile={isMobile}
                  handleCloseNav={handleCloseNav}
                />
              ) : (
                ""
              )}
            </>
          )}
          <div
            className="svg_container"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <FaSearch className={showSearch ? "blue_svg" : "gray_svg"} />
          </div>
          <>
            {isMobile && showSearch ? (
              ""
            ) : (
              <>
                {showCart ? (
                  <div
                    className="svg_container"
                    onClick={() => setShowCart(false)}
                  >
                    <FaTimes className="cross_svg" />
                  </div>
                ) : (
                  <div onClick={handleShowCart} className="svg_container">
                    <FaShoppingCart
                      className={cart.length ? "blue_svg" : "gray_svg"}
                    />
                  </div>
                )}

                {user ? (
                  <>
                    <div
                      onClick={() => navigate("/personal")}
                      className="svg_container"
                    >
                      <FaUserCog className="gray_svg" />
                    </div>
                    <div onClick={handleLogOut} className="svg_container">
                      <FaUserAltSlash className="gray_svg" />
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => navigate("auth")}
                    className="svg_container"
                  >
                    <FaUser className="gray_svg" />
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
      <>{showCart ? <Cart handleCloseCart={handleCloseCart} /> : ""}</>
    </>
  );
};

export default Header;
