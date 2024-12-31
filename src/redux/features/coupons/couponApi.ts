import baseApi from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --------- apply coupon
    applyCoupon: builder.mutation({
      query: (couponInfo) => {
        return {
          url: `/coupons/apply-coupon`,
          method: "POST",
          body: couponInfo,
        };
      },
    }),
  }),
});

export const { useApplyCouponMutation } = couponApi;
