import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a category into db
    createCategory: builder.mutation({
      query: (newCategory) => {
        return {
          url: `/categories/create-category`,
          method: "POST",
          body: newCategory,
        };
      },
      invalidatesTags: ["categories"],
    }),

    // ---------- load all categories from db
    loadAllPublicCategories: builder.query({
      query: () => {
        return { url: `/categories/public` };
      },
      providesTags: ["categories-public"],
    }),

    // ---------- load single category
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
      }),
      providesTags: (_result, _error, arg) => [
        { type: "category", id: arg.id },
      ],
    }),

    // ---------- update single category
    updateCategory: builder.mutation({
      query: ({ categoryId, category }) => {
        return {
          url: `/categories/${categoryId}`,
          method: "PATCH",
          body: category,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "category", id: arg.categoryId },
      ],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useLoadAllPublicCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
