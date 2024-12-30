"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "@/components/product/ProductCard";

export default function RecentProductsPage() {
  const [recentProducts, setRecentProducts] = useState([
    {
      _id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      ],
      category: "Electronics",
    },
  ]);

  useEffect(() => {
    const item = localStorage.getItem("recentlyViewed");
    const recentlyViewed = item ? JSON.parse(item) : [];
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-8">Recently Viewed Products</h1>

      {recentProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl">You have not viewed any products recently.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pr-4">
            {recentProducts.map((product) => (
              <ProductCard
                behaviour="recentlyViewed"
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
