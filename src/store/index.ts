import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import userReducer from "./user/userSlice";
import shopReducer from "./shop/shopSlice";
import cartReducer from "./cart/cartSlice";
import storage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["shop"],
};

const shopPersistConfig = {
  key: "shop",
  storage: storage,
  whitelist: [
    "categories",
    "selectedCategory",
    "brands",
    "productInfos",
    "products",
  ],
};

const rootReducer = combineReducers({
  shop: persistReducer(shopPersistConfig, shopReducer),
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootReducer = ReturnType<typeof rootReducer>;
