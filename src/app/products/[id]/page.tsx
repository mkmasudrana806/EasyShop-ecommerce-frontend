"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/features/products/productApi";
import { ReviewSystem } from "@/components/ReviewSystem";
import ProductDetails from "@/components/product/ProductDetails";
import { RecentlyViewedProducts } from "@/components/product/RecentlyViewedProducts";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/components/contexts/RecentlyViewedContext";

export default function ProductDetailsPage() {
  const { id } = useParams();

  // ------------------- redux ----------------
  const { data: product, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  // ------------------- react ----------------
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (product?.data) {
      addToRecentlyViewed(product.data);
    }
  }, [addToRecentlyViewed, product?.data]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* product details */}
      <ProductDetails product={product?.data} isLoading={isLoading} />

      {/* review system  */}
      <ReviewSystem productId={product?.data?._id} />

      {/* product recommendations  */}
      <ProductRecommendations category={product?.data?.category} />

      {/* recently viewed products  */}
      <RecentlyViewedProducts />
    </div>
  );
}
