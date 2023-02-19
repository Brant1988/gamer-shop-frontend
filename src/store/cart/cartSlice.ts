import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

interface CartState {
  cart: Product[];
  cartSummary: number;
  cartItemsQnty: number;
}

const initialState: CartState = {
  cart: [],
  cartSummary: 0,
  cartItemsQnty: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const isInCart = state.cart.find(
        (product) => product.id === action.payload.id
      );
      !isInCart
        ? (state.cart = [...state.cart, { ...action.payload, amount: 1 }])
        : (state.cart = state.cart.map((product) => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                amount: (product.amount || 0) + 1,
              };
            }
            return product;
          }));
    },
    clearCart(state) {
      state.cart = [];
    },
    increaseAmount(state, action: PayloadAction<string>) {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            amount: (product.amount || 0) + 1,
          };
        }
        return product;
      });
    },
    decreaseAmount(state, action: PayloadAction<string>) {
      const currentProduct = state.cart.find(
        (product) => product.id === action.payload
      );
      currentProduct?.amount === 1
        ? (state.cart = state.cart.filter(
            (product) => product.id !== action.payload
          ))
        : (state.cart = state.cart.map((product) => {
            if (product.id === action.payload) {
              return {
                ...product,
                amount: (product.amount || 0) - 1,
              };
            }
            return product;
          }));
    },
    calculateSum(state) {
      const cartTotal = state.cart.reduce(
        (acc, product) => {
          const { price, amount } = product;
          if (amount) {
            const itemTotal = price * amount;
            acc.summary += itemTotal;
            acc.quantity += amount;
          }
          return acc;
        },
        {
          summary: 0,
          quantity: 0,
        }
      );
      state.cartItemsQnty = cartTotal.quantity;
      state.cartSummary = cartTotal.summary;
    },
  },
});

export default cartSlice.reducer;
