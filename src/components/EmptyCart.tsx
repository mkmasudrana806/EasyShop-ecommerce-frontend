import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
        </CardHeader>
        <CardContent>
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            Looks like you have not added any items to your cart yet.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/products">Browse Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmptyCart;
