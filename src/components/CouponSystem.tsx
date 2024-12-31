"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { useApplyCouponMutation } from "@/redux/features/coupons/couponApi";
import { ErrorResponse } from "@/types/ErrorResponse";
import { TApplyCoupon, TCouponResult } from "@/types/couponType";

interface CouponSystemProps {
  vendorId: string;
  cartTotal: number;
  onCouponApplied: (vendorDiscount: number, globalDiscount: number) => void;
}

export function CouponSystem({
  vendorId,
  cartTotal,
  onCouponApplied,
}: CouponSystemProps) {
  // ------------- redux --------------------
  const [applyCoupon, { isLoading, isError, isSuccess }] =
    useApplyCouponMutation();

  // ---------------- react ----------------
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<TCouponResult | null>(null);
  const [error, setError] = useState<string[]>([]);

  // ------------------- handle apply coupon ------------
  const handleApplyCoupon = async () => {
    setError([]);
    setCouponStatus(null);

    const couponInfo = {
      code: couponCode,
      cartTotal: 2000,
      vendorId,
    };
    try {
      const result = await applyCoupon(couponInfo).unwrap();
      setCouponStatus(result.data);
    } catch (err) {
      (err as ErrorResponse).data.errorSources.forEach((err) => {
        setError((prevErrors) => [...prevErrors, err.message]);
      });
    }
  };

  return (
    <div className="mt-4">
      {/* apply coupon  */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button
          disabled={isLoading || couponStatus?.isValid}
          onClick={handleApplyCoupon}
        >
          {isLoading && !isError && !isSuccess
            ? "Applying Coupon..."
            : !isLoading && isSuccess
            ? "Coupon applied"
            : "Apply Coupon"}
        </Button>
      </div>

      {couponStatus?.isValid && (
        <Alert className="mt-2 bg-green-50 text-green-600 border-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Coupon applied successfully!</AlertDescription>
        </Alert>
      )}
      {error.length > 0 && (
        <Alert className="mt-2 bg-red-50 text-red-800 border-red-300">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
