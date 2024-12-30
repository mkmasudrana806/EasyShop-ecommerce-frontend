"use client";

import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types/productType";

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Recently Viewed Products</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {recentlyViewed.map((product: TProduct) => (
            <ProductCard
              product={product}
              key={product._id}
              behaviour="recentlyViewed"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
