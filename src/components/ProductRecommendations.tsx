"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, BarChart2 } from "lucide-react";
import { useComparison } from "./contexts/ComparisonContext";
import { useWishlist } from "./contexts/WishlistContext";
import { TProduct } from "@/types/productType";
import { useLoadAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "./message/Loading";

interface ProductRecommendationsProps {
  currentProductCategory: string;
}

export function ProductRecommendations({
  currentProductCategory,
}: ProductRecommendationsProps) {
  // -------------- redux ----------------
  const { data: products, isLoading } = useLoadAllProductsQuery(undefined, {
    skip: !currentProductCategory,
  });

  // -------------- react ----------------
  const [recommendations, setRecommendations] = useState<TProduct[]>([]);
  const { addToComparison, isInComparison, removeFromComparison } =
    useComparison();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  setRecommendations(
    products?.data?.filter(
      (product: TProduct) => product.category === currentProductCategory
    )
  );

  if (isLoading) {
    return <Loading />;
  }
  const handleWishlistToggle = (product: TProduct) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCompareToggle = (product: TProduct) => {
    if (isInComparison(product._id)) {
      removeFromComparison(product._id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations?.map((product) => (
          <Card key={product._id} className="flex flex-col">
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
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 ${
                    isInWishlist(product._id) ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => handleWishlistToggle(product)}
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
              <Badge variant="secondary" className="mt-2">
                {product.category}
              </Badge>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`/products/${product._id}`}>View Product</Link>
              </Button>
              <Button
                variant={isInComparison(product._id) ? "secondary" : "outline"}
                className="w-full"
                onClick={() => handleCompareToggle(product)}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                {isInComparison(product._id)
                  ? "Remove from Compare"
                  : "Add to Compare"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
