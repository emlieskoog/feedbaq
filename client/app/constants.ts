export const API_BASE_URL = "http://localhost:8080/api";
export const MAX_LOGIN_ATTEMPTS = 3;
export const APP_NAME = "FeedbaQ App";
export const BASE_PATH = "/";

export const appRoutes = {
  LOGIN_PAGE: `${BASE_PATH}`,
  ACCOUNT_PAGE: `${BASE_PATH}account`,
  NEW_FORM: `${BASE_PATH}account/new-form`,
  CUSTOMER_FORM: `${BASE_PATH}customer-form`,
};

export const formInputType = [
  "info",
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
  "rating",
  "rating",
  "text",
  "text",
  "text",
  "text",
  "text",
];

export const customerFormInput = [
  "rating",
  "rating",
  "rating",
  "rating",
  "rating",
  "rating",
  "text",
  "text",
  "text",
];
