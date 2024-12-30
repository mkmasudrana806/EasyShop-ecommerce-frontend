"use client";

import { useState } from "react";
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
import ErrorComponent from "@/components/message/ErrorComponent";
import DataNotFound from "@/components/message/DataNotFound";
import { useLoadAllPublicCategoriesQuery } from "@/redux/features/categories/categoryApi";
import { TCategory } from "@/types/categoryType";

// const categories = ["All", "Electronics", "Fashion", "Sports", "Home & Garden"];

export default function ProductsPage() {
  // ---------------- redux --------------------
  const {
    data: products,
    isLoading,
    isError,
  } = useLoadAllProductsQuery(undefined);

  const { data, isLoading: isCategoryLoading } =
    useLoadAllPublicCategoriesQuery(undefined);

  const categories: string[] =
    data?.data?.map((category: TCategory) => category.name) || [];

  // ---------------- react --------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products?.data?.filter(
    (product: TProduct) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (product.category.toLowerCase() ===
        selectedCategory?.toLocaleLowerCase() ||
        selectedCategory === "")
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // content to render
  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && currentProducts?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && currentProducts?.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {currentProducts?.map((product: TProduct) => (
          <ProductCard
            key={product._id}
            product={product}
            behaviour="productCard"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* search products  */}
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />

        {/* filter product by category */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue
              placeholder={
                isCategoryLoading ? "Loading categories..." : "Select category"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* products containers  */}
      {content}

      {/* pagination */}
      <div className="flex justify-center gap-2">
        {Array.from(
          { length: Math.ceil(filteredProducts?.length / productsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
