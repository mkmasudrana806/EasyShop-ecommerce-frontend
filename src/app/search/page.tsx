"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";
import { useLoadAllProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/productType";
import Loading from "@/components/message/Loading";
import { Search } from "lucide-react";

export default function SearchResultsPage() {
  // Fetching products from Redux RTK Query
  const {
    data: productsResponse,
    isLoading,
    error,
  } = useLoadAllProductsQuery(undefined);
  const products = productsResponse?.data || [];

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredProducts, setFilteredProducts] =
    useState<TProduct[]>(products);

  // handle filtering and sorting whenever searchTerm, sortBy, or products change
  useEffect(() => {
    if (!products || isLoading) return;

    const filtered = products.filter(
      (product: TProduct) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // 'relevance' - no sorting
    });

    setFilteredProducts(sorted);
  }, [searchTerm, sortBy, products, isLoading]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error fetching products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for &quot;{searchTerm}&quot;
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* search products  */}
        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md relative">
          <Input
            type="search"
            className="w-full bg-background text-foreground pr-10"
            placeholder="Refine your search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* filter by category  */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl">No products found matching your search.</p>
          <p className="mt-2">
            Try adjusting your search terms or browse our categories.
          </p>
          <Button asChild className="mt-4">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: TProduct) => (
            <ProductCard
              key={product._id}
              product={product}
              behaviour="productCard"
            />
          ))}
        </div>
      )}
    </div>
  );
}
