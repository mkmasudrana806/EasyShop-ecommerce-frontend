"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CouponSystem } from "@/components/CouponSystem";
import ShippingInforForm from "@/components/ShippingInfoForm";
import EmptyCart from "@/components/EmptyCart";
import { useAppSelector } from "@/redux/hooks";
import { TCouponResult } from "@/types/couponType";
import TOrder from "@/types/orderType";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useMakeAnOrderMutation } from "@/redux/features/orders/orderApi";
import ErrorAlert from "@/components/message/ErrorAlert";

export default function CheckoutPage() {
  // --------------- redux --------------------
  const cartsState = useAppSelector((state) => state.carts);
  const carts = cartsState?.items;
  const vendorId = cartsState?.vendor as string;
  const [makeAnOrder, { isLoading }] = useMakeAnOrderMutation();

  const [couponDiscount, setCouponDiscount] = useState(0);
  const [error, setError] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const subtotal =
    (carts.length > 0 &&
      carts.reduce((sum, item) => sum + item.price * item.quantity, 0)) ||
    0;
  const total = subtotal - couponDiscount;

  // callback to get coupon result after applied coupon
  const handleCouponApplied = (couponResult: TCouponResult) => {
    setCouponDiscount(couponResult.discount);
    setCouponCode(couponResult.couponCode);
  };

  // shiping form ref to call function of that component from here
  const shippingFormRef = useRef<{
    submitForm: () => {
      success: boolean;
      missingFields?: string[];
      values?: any;
    };
  } | null>(null);

  // ---------- handle checkout ------------------------------
  const handleCheckout = async () => {
    // check shipping form status
    if (shippingFormRef.current) {
      const result = shippingFormRef.current.submitForm();
      if (result.success) {
        const orderData: Partial<TOrder> = {
          vendor: vendorId,
          items: carts.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
          shippingInfo: result.values,
          couponCode: couponCode ? couponCode : null,
        };

        // initiate payment
        try {
          const result = await makeAnOrder(orderData).unwrap();
          if (result.success) {
            window.location.href = result?.data?.payment_url;
          }
        } catch (err) {
          (err as ErrorResponse).data?.errorSources?.forEach((err) => {
            setError((prevErrors) => [...prevErrors, err.message]);
          });
        }
      }
    }
  };

  // if cart is empty then show a message
  if (carts.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto  py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* shiping information  */}
        <ShippingInforForm ref={shippingFormRef} />

        {/* order summary  */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {carts.length > 0 &&
              carts.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            {/* subtotal  */}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* coupon apply  */}
            <CouponSystem
              vendorId={vendorId}
              cartTotal={carts[0].price}
              onCouponApplied={handleCouponApplied}
            />
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>-${couponDiscount?.toFixed(2)}</span>
              </div>
            )}

            {/* total  */}
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={handleCheckout}
            >
              {isLoading ? "Redirecting to marchant..." : "Proceed to Payment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* error show  */}
      {error.length > 0 && <ErrorAlert error={error} />}
    </div>
  );
}
