export const BASE_URL = "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ONBOARDING: "/onboarding",
  CART: "/cart",
  PRODUCT: (id = ":id") => `/product/${id}`,
};

export const APP_KEYS = {
  TOKEN: "token",
  ONBOARDED: "onboarded",
  USERNAME: "username",
};

export const API_ENDPOINTS = {
  PRODUCTS: "/sneaker",
  PRODUCT_ITEM: "/sneaker/item",
  BRANDS: "/sneaker/brands",
};
