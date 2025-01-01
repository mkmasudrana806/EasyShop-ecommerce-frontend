"use client";

import { TProduct } from "@/types/productType";
import { useLoadAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "./message/Loading";
import ProductCard from "./product/ProductCard";
import DataNotFound from "./message/DataNotFound";

export function ProductRecommendations({ category }: { category: string }) {
  // -------------- redux ----------------
  const {
    data: products,
    isLoading,
    isError,
  } = useLoadAllProductsQuery(undefined);

  const recommendedProducts =
    products?.data?.filter(
      (product: TProduct) => product.category === category
    ) || [];

  if (isLoading) {
    return <Loading />;
  }

  // content to render
  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <div className="text-center">Failed to load products</div>;
  } else if (!isLoading && !isError && products?.data?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && !isError && products?.data?.length > 0) {
    content = recommendedProducts?.map((product: TProduct) => (
      <ProductCard
        key={product._id}
        product={product}
        behaviour="recommended"
      />
    ));
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {content}
      </div>
    </div>
  );
}
