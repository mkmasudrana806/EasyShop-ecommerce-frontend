"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart2, Heart } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparison } from "../contexts/ComparisonContext";
import { QuickView } from "./QuickView";

/**
 *
 * @param product product information
 * @param behaviour behaviour of the card for different use cases
 * example: card for product, card for recently viewed product, card for recommended product
 */

const ProductCard = ({
  product,
  behaviour,
}: {
  product: any;
  behaviour?: "productCard" | "recentlyViewed" | "recommended" | "wishlist";
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { addToComparison, isInComparison, removeFromComparison } =
    useComparison();

  const handleCompareToggle = () => {
    if (isInComparison(product._id)) {
      removeFromComparison(product._id);
    } else {
      addToComparison(product);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card key={product._id} className="flex flex-col">
      <CardContent className="p-4 flex-grow">
        <div className="relative">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>
          <Button
            variant="secondary"
            size="sm"
            className={`absolute top-2 right-2`}
          >
            <Heart
              onClick={handleWishlistToggle}
              className={`h-6 w-6 ${
                isInWishlist(product._id)
                  ? "text-red-500 fill-current"
                  : "text-gray-500"
              }`}
            />
            {behaviour === "productCard" && (
              <BarChart2
                onClick={handleCompareToggle}
                className={`h-6 w-6 ${
                  isInComparison(product._id)
                    ? "text-red-500 fill-current"
                    : "text-gray-500"
                }`}
              />
            )}
          </Button>
        </div>
        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <Badge variant="secondary" className="mt-2">
          {product.category}
        </Badge>
      </CardContent>
      <CardFooter>
        {/* button for product card  */}
        {behaviour === "productCard" ? (
          <div className="flex flex-col w-full gap-2">
            <Button className="w-full">Add to Cart</Button>
            <QuickView product={product} key={product._id} />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
            <Button asChild className="w-full">
              <Link href={`/products/${product._id}`}>View Product</Link>
            </Button>
            <Button
              variant={isInComparison(product._id) ? "secondary" : "outline"}
              className="w-full"
              onClick={handleCompareToggle}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              {isInComparison(product._id)
                ? "Remove from Compare"
                : "Add to Compare"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
