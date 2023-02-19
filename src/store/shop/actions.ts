import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../http/axios.config";
import { CategoryRoutes, ProductRoutes } from "../../types/routes";
import { Categories, Product } from "../../types/types";

interface ProductRequest {
  id?: string;
  categoryId?: string;
  brandId?: Array<string>;
  descriptionIds?: Array<string>;
  page?: number;
}
interface ProductsResponse {
  rows: Product[];
  count: number;
}
interface MyKnownError {
  errorMessage: string;
}

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  ProductRequest,
  { rejectValue: MyKnownError }
>("product", async (productParams: ProductRequest) => {
  const { categoryId, brandId, descriptionIds, id, page } = productParams;
  let response;
  if (id) {
    response = await apiClient.get<ProductsResponse>("product", {
      params: {
        id,
      },
    });
  } else if (brandId?.length && descriptionIds?.length) {
    const filterRequest = {
      brandId,
      descriptionIds,
      categoryId,
      page,
    };
    response = await apiClient.get<ProductsResponse>(ProductRoutes.GET, {
      params: filterRequest,
    });
  } else if (brandId?.length) {
    const filterRequest = { brandId: brandId, categoryId, page };
    response = await apiClient.get<ProductsResponse>(ProductRoutes.GET, {
      params: filterRequest,
    });
  } else if (descriptionIds?.length) {
    const filterRequest = { descriptionIds, categoryId, page };
    response = await apiClient.get<ProductsResponse>(ProductRoutes.GET, {
      params: filterRequest,
    });
  } else if (categoryId) {
    response = await apiClient.get<ProductsResponse>(ProductRoutes.GET, {
      params: {
        categoryId,
        page,
      },
    });
  } else {
    response = await apiClient.get<ProductsResponse>(ProductRoutes.GET, {
      params: {
        page,
      },
    });
  }
  return response.data;
});

export const fetchCategories = createAsyncThunk("category", async () => {
  const response = await apiClient.get<Categories[]>(CategoryRoutes.GET);
  return response.data;
});
