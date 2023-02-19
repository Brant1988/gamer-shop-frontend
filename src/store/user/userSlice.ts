import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import jwt_decode from "jwt-decode";
import { loginUser, registerUser } from "./actions";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      localStorage.clear();
      state.user = null;
      state.error = "";
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("token", payload);
      state.user = jwt_decode(payload);
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("token", payload);
      state.user = jwt_decode(payload);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  },
});

export default userSlice.reducer;
