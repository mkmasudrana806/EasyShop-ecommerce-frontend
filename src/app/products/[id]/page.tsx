"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/features/products/productApi";
import { ReviewSystem } from "@/components/ReviewSystem";
// import { ProductRecommendations } from "@/components/ProductRecommendations";
import ProductDetails from "@/components/product/ProductDetails";
import { RecentlyViewedProducts } from "@/components/product/RecentlyViewedProducts";

export default function ProductPage() {
  const { id } = useParams();

  // ------------------- redux ----------------
  const { data: product, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* product details */}
      <ProductDetails product={product?.data} isLoading={isLoading} />

      {/* review system  */}
      <ReviewSystem productId={product?.data?._id} />

      {/* product recommendations  */}
      {/* <ProductRecommendations
        currentProductCategory={product?.data?.category}
      /> */}

      {/* recently viewed products  */}
      <RecentlyViewedProducts />
    </div>
  );
}
