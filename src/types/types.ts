export interface Categories {
  id: string;
  name: string;
  prodInfoTitles: ProdInfoTitles[];
  brands: Brand[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  isOnSale: boolean;
  categoryId: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  productDescriptions: ProductInfoDescription[];
  images: ProductImage[];
  amount?: number;
}

export interface ProductImage {
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface ProdInfoTitles {
  id: string;
  name: string;
  categories: Categories[];
  descriptions: ProductInfoDescription[];
}

export interface ProductInfoDescription {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface UserPersonalData {
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface UserAdressData {
  city: string;
  country: string;
  adress: string;
  postalCode: string;
}

export interface Shop {
  id: string;
  city: string;
  country: string;
  adress: string;
  postalCode: string;
}

export interface OrderCreateResponse {
  id: string;
  message: string;
}

export interface OrderedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  isOnSale: boolean;
  categoryId: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  productDescriptions: ProductInfoDescription[];
  images: ProductImage[];
  amount: { amount: number };
}

export interface Order {
  id: string;
  createdAt: string;
  products: OrderedProduct[];
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  adress: string;
  delivery: boolean;
  userName: string;
  userSurname: string;
  summary: string;
  status: string;
}

export interface OrderGetResponse {
  count: number;
  rows: Order[];
}
