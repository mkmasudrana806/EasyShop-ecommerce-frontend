import baseApi from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -------- make an order
    makeAnOrder: builder.mutation({
      query: (newOrder) => {
        return {
          url: `/orders/create-order`,
          method: "POST",
          body: newOrder,
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useMakeAnOrderMutation } = orderApi;
