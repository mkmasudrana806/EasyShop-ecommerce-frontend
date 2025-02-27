import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

// base query function
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// custom base query function
const customBaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // result return an object with {error or data, meta}
  if (result.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const { data } = await res.json();
    const token = data?.accessToken;
    // after expired access token and fetch again to refresh-token route
    // if accessToken is provided, means refreshToken is valid.
    if (token) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token }));
      result = await baseQuery(args, api, extraOptions);
    }
    // if accessToken not provided even refresh-token api route is hit.
    // means refreshToken was expired
    else {
      api.dispatch(logout());
    }
  }
  return result;
};

// base api
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithRefreshToken,
  tagTypes: [
    "products",
    "product",
    "categories",
    "categories-public",
    "category",
    "user-products",
    "reviews",
    "reviews-product",
    "review",
    "users",
    "vendors",
    "vendor",
    "vendor-products",
    "user",
    "orders",
    "order",
    "payments",
    "payment",
    "user-payments",
    "credentials",
    "admin-insights",
    "user-insights",
    "monthly-overview",
  ],
  endpoints: () => ({}),
});

export default baseApi;
