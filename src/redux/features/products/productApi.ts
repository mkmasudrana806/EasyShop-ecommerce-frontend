import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a product into db
    createProduct: builder.mutation({
      query: (newProduct) => {
        return {
          url: `/products/create-product`,
          method: "POST",
          body: newProduct,
        };
      },
      invalidatesTags: ["products"],
    }),

    // --------- load all product
    // loadAllProducts: builder.query({
    //   query: ({ searchTerm, sort, limit, page, ...others }) => {
    //     const params = new URLSearchParams();
    //     // Search term
    //     if (searchTerm) {
    //       params.append("searchTerm", searchTerm);
    //     }
    //     // Sorting
    //     if (sort) {
    //       params.append("sort", sort);
    //     }
    //     // Pagination
    //     if (limit) {
    //       params.append("limit", limit.toString());
    //     }
    //     if (page) {
    //       params.append("page", page.toString());
    //     }

    //     // Handle dynamic properties in "others"
    //     Object.keys(others).forEach((key) => {
    //       if (others[key] && others[key] !== "default") {
    //         params.append(key, others[key].toString());
    //       }
    //     });

    //     return { url: `/products?${params.toString()}` };
    //   },
    //   providesTags: ["products"],
    // }),

    loadAllProducts: builder.query({
      query: () => {
        return { url: `/products` };
      },
      providesTags: ["products"],
    }),

    // --------- get user products
    getUserProducts: builder.query({
      query: (userId) => {
        return { url: `/products/my-products/${userId}` };
      },
      providesTags: (_result, _error, arg) => [
        { type: "user-products", id: arg.userId },
      ],
    }),

    // ---------- load single product
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "product", id: arg.id }],
    }),

    // ---------- delete single product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "user-products", id: arg },
      ],
    }),

    // ---------- update single product
    updateProduct: builder.mutation({
      query: ({ productId, product }) => {
        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: product,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "product", id: arg.productId },
      ],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useLoadAllProductsQuery,
  useGetUserProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

 