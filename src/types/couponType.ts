// coupon type
export type TCoupon = {
  code: string;
  discountPercentage: number;
  minimumOrderAmount: number;
  expiryDate: Date;
  usageLimit?: number;
  timesUsed: number;
  vendorId?: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TApplyCoupon = {
  code: string;
  cartTotal: number;
  vendorId: string;
};


export type TCouponResult = {
  isValid: boolean;
  discount: number;
  finalTotal: number;
};