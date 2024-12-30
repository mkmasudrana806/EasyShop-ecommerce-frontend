"use client";

import { useLoadAllProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/productType";
import FlashSaleCard from "@/components/product/FlashSaleCard";
import Loading from "@/components/message/Loading";

/**
 *
 *  Flash Sale page shows a list of products on sale for a limited time.
 */
export default function FlashSalePage() {
  // --------------- redux ---------------
  const { data: products, isLoading } = useLoadAllProductsQuery(undefined);

  // content to render
  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && products?.data?.length === 0) {
    content = <h1>There are not flash sale offers availabel now!</h1>;
  } else if (!isLoading && products?.data?.length > 0) {
    content = products?.data?.map(
      (product: TProduct) =>
        product.flashSale && (
          <FlashSaleCard key={product._id} product={product} />
        )
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Flash Sale</h1>
      <p className="text-gray-600 mb-8">
        Hurry! These deals are only available for a limited time. Grab them
        before they are gone!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {content}
      </div>
    </div>
  );
}
