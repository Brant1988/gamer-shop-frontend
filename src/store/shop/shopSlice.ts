import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand, Categories, ProdInfoTitles, Product } from "../../types/types";
import { fetchCategories, fetchProducts } from "./actions";

interface ShopState {
  products: Product[];
  brands: Brand[];
  productInfos: ProdInfoTitles[];
  categories: Categories[];
  selectedCategory: string;
  selectedBrandIds: Array<string>;
  selectedDescriptionIds: Array<string>;
  page: number;
  totalProductQnty: number;
  isLoading: boolean;
  error: string;
  isMobile: boolean;
}

const initialState: ShopState = {
  products: [],
  brands: [],
  productInfos: [],
  categories: [],
  selectedBrandIds: [],
  selectedDescriptionIds: [],
  page: 1,
  totalProductQnty: 0,
  selectedCategory: "",
  isLoading: false,
  error: "",
  isMobile: false,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    selectCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setBrands(state, action: PayloadAction<Brand[]>) {
      state.brands = [...action.payload];
    },
    setInfos(state, action: PayloadAction<ProdInfoTitles[]>) {
      state.productInfos = [...action.payload];
    },
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
    selectBrand(state, action: PayloadAction<string>) {
      if (state.selectedBrandIds.includes(action.payload)) {
        state.selectedBrandIds = [
          ...state.selectedBrandIds.filter((id) => id !== action.payload),
        ];
      } else {
        state.selectedBrandIds = [...state.selectedBrandIds, action.payload];
      }
    },
    selectDescription(state, action: PayloadAction<string>) {
      if (state.selectedDescriptionIds.includes(action.payload)) {
        state.selectedDescriptionIds = [
          ...state.selectedDescriptionIds.filter((id) => id !== action.payload),
        ];
      } else {
        state.selectedDescriptionIds = [
          ...state.selectedDescriptionIds,
          action.payload,
        ];
      }
    },
    clearFilters(state) {
      state.selectedBrandIds = [];
      state.selectedDescriptionIds = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.products = [...payload.rows];
      state.totalProductQnty = payload.count;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message as string;
      }
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.categories = [...payload];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export default shopSlice.reducer;
