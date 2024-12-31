import baseApi from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a review into db
    createReview: builder.mutation({
      query: ({ productId, newReview }) => {
        return {
          url: `/reviews/create-review`,
          method: "POST",
          body: newReview,
        };
      },

      invalidatesTags: (_result, _error, arg) => [
        { type: "reviews-product", id: arg.productId },
      ],
    }),

    // ---------- get reviews of a products
    getReviewsOfProduct: builder.query({
      query: (productId) => {
        return { url: `/reviews/product-reviews/${productId}` };
      },
      providesTags: (_result, _error, arg) => [
        { type: "reviews-product", id: arg },
      ],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsOfProductQuery } =
  reviewApi;
