"use client";

import Image from "next/image";
import Link from "next/link";
import { useComparison } from "../contexts/ComparisonContext";
import { useWishlist } from "../contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, BarChart2 } from "lucide-react";
import { QuickView } from "./QuickView";
import { TProduct } from "@/types/productType";

const FeaturedProductCard = ({ product }: { product: TProduct }) => {
  const { addToComparison, isInComparison, removeFromComparison } =
    useComparison();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCompareToggle = () => {
    if (isInComparison(product._id)) {
      removeFromComparison(product._id);
    } else {
      addToComparison(product);
    }
  };

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
          <Button
            variant="secondary"
            size="icon"
            className={`absolute top-2 right-2 ${
              isInWishlist(product._id) ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-6 w-6 ${
                isInWishlist(product._id) ? "fill-current" : ""
              }`}
            />
          </Button>
        </div>
        <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <div className="flex justify-between">
          <Badge variant="secondary" className="mt-2">
            {product.category}
          </Badge>
          {product?.featured && (
            <Image
              width="32"
              height="32"
              src="https://img.icons8.com/nolan/64/filled-star.png"
              alt="filled-star"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <Button asChild variant="outline">
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
          <QuickView product={product} />
        </div>

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
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
