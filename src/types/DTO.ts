import { Product } from "./types";

export interface UserDTO {
  email: string;
  password: string;
}

export interface UserInfoDTO {
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface UserProfileEditDTO {
  name?: string;
  surname?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  adress?: string;
  postalCode?: string;
}

export interface UserAdressDTO {
  city: string;
  country: string;
  adress: string;
  postalCode: string;
}

export interface OrdersDto {
  email?: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  adress: string;
  delivery: boolean;
  userName: string;
  userSurname: string;
  summary: string;
  userId?: string;
  products: Array<Product>;
}
