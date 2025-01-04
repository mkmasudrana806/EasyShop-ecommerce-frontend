"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeCartItem,
  updateCartQuantity,
} from "@/redux/features/contexts/cartsSlice";
import { TCartItem } from "@/types/cartType";
import { useRouter } from "next/navigation";

export function Cart() {
  // ----------------- redux --------------------
  const cartItems = useAppSelector((state) => state.carts.items);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.userId);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const router = useRouter();

  // handle update cart quantity
  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  // handle remove cart item
  const handleRemoveCartItem = (id: string) => {
    dispatch(removeCartItem(id));
  };

  // decide to render cart button content
  let cartBtnContent = null;
  if (cartItems.length > 0) {
    cartBtnContent = userId ? (
      <Link href="/checkout">Proceed to Checkout</Link>
    ) : (
      <button onClick={() => router.push(`/login?from=/checkout`)}>
        Login to Checkout
      </button>
    );
  } else {
    cartBtnContent = (
      <p className={`${cartItems.length === 0 ? "cursor-not-allowed" : ""}`}>
        Your cart is empty
      </p>
    );
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} item(s) in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          {cartItems.map((item: TCartItem) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateCartQuantity(item._id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded mr-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCartItem(item._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          <Button className="w-full mt-4" asChild>
            {cartBtnContent}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
