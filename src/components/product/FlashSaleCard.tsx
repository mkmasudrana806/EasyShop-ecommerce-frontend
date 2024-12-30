import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { TProduct } from "@/types/productType";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

const FlashSaleCard = ({ product }: { product: TProduct }) => {
  return (
    <Card className="flex flex-col">
      <CardContent className="p-4 flex-grow">
        <div className="relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-red-600">
            {product?.discount}% OFF
          </Badge>
        </div>
        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600 line-through">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-red-600 font-bold">
            ${product.flashSalePrice?.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button className="w-full">Add to Cart</Button>
          <Button variant="outline" className="w-full">
            <Link href={`/products/${product._id}`}>View Product</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlashSaleCard;
