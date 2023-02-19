import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../http/axios.config";
import { UserRoutes } from "../../types/routes";
import { UserDTO } from "../../types/DTO";

export const registerUser = createAsyncThunk(
  UserRoutes.REGISTER,
  async (userData: UserDTO, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(UserRoutes.REGISTER, {
        ...userData,
      });
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  UserRoutes.LOGIN,
  async (userData: UserDTO, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(UserRoutes.LOGIN, {
        ...userData,
      });
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);
