"use client";

import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import Link from "next/link";

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();
  return (
    <section className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Recently Viewed Products</h1>

      {recentlyViewed.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl">You have not viewed any products recently.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pr-4">
            {recentlyViewed.map((product) => (
              <ProductCard
                behaviour="recentlyViewed"
                key={product?._id}
                product={product}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </section>
  );
}
