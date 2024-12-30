import baseApi from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a vendor into db
    createVendor: builder.mutation({
      query: (newVendor) => {
        return {
          url: `/vendors/create-vendor`,
          method: "POST",
          body: newVendor,
        };
      },
      invalidatesTags: ["vendors"],
    }),

    // --------- load all vendor
    // loadAllVendors: builder.query({
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

    //     return { url: `/vendors?${params.toString()}` };
    //   },
    //   providesTags: ["vendors"],
    // }),

    loadAllVendors: builder.query({
      query: ({ searchTerm, sort, limit, page, ...others }) => {
        const params = new URLSearchParams();
        // Search term
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        // Sorting
        if (sort) {
          params.append("sort", sort);
        }
        // Pagination
        if (limit) {
          params.append("limit", limit.toString());
        }
        if (page) {
          params.append("page", page.toString());
        }

        // Handle dynamic properties in "others"
        Object.keys(others).forEach((key) => {
          if (others[key] && others[key] !== "default") {
            params.append(key, others[key].toString());
          }
        });

        return { url: `/vendors?${params.toString()}` };
      },
      providesTags: ["vendors"],
    }),

    // ---------- load single vendor
    getVendorById: builder.query({
      query: (id) => ({
        url: `/vendors/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "vendor", id: arg.id }],
    }),

    // ---------- update single vendor
    updateVendor: builder.mutation({
      query: ({ vendorId, vendor }) => {
        return {
          url: `/vendors/${vendorId}`,
          method: "PATCH",
          body: vendor,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "vendor", id: arg.vendorId },
      ],
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useLoadAllVendorsQuery,
  useGetVendorByIdQuery,
  useUpdateVendorMutation,
} = vendorApi;

 