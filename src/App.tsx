import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";
import { cartSlice } from "./store/cart/cartSlice";
import OrderPage from "./pages/OrderPage/OrderPage";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";
import { authClient } from "./http/axios.config";
import { UserRoutes } from "./types/routes";
import { userSlice } from "./store/user/userSlice";
import Header from "./components/Header/Header";
import { useWindowWidth } from "./hooks/useWindowWidth";
import { shopSlice } from "./store/shop/shopSlice";

const App = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { calculateSum } = cartSlice.actions;
  const { logOut } = userSlice.actions;
  const { setIsMobile } = shopSlice.actions;
  const dispatch = useAppDispatch();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const refreshToken = async () => {
      try {
        await authClient.get(UserRoutes.AUTH, {
          params: {
            isOnSale: true,
          },
        });
      } catch (error) {
        dispatch(logOut());
      }
    };
    refreshToken();
  }, [dispatch, logOut]);

  useEffect(() => {
    dispatch(calculateSum());
  }, [cart, dispatch, calculateSum]);

  useEffect(() => {
    if (windowWidth <= 1200) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [windowWidth, dispatch, setIsMobile]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/product/:name" element={<ProductPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
