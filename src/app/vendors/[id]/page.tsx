"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import VendorPublicProfile from "@/components/vendor/VendorPublicProfile";
import { useGetVendorProductsQuery } from "@/redux/features/products/productApi";
import ProductCard from "@/components/product/ProductCard";
import { TProduct } from "@/types/productType";
import Loading from "@/components/message/Loading";
import ErrorComponent from "@/components/message/ErrorComponent";
import DataNotFound from "@/components/message/DataNotFound";

const VendorProfilePage = () => {
  const { id } = useParams();
  // --------------- redux ----------------
  const {
    data: products,
    isLoading,
    isError,
  } = useGetVendorProductsQuery(id, {
    skip: !id,
  });

  // --------------- react ----------------
  // const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // const filteredProducts = products?.data?.filter((product: TProduct) =>
  //     product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //   ).sort((a: TProduct, b: TProduct) => {
  //     if (sortBy === "price") return a.price - b.price;
  //     return a.name.localeCompare(b.name);
  //   });

  // products to render
  let productContent = null;
  if (isLoading && !isError) {
    productContent = <Loading />;
  } else if (!isLoading && isError) {
    productContent = <ErrorComponent />;
  } else if (!isLoading && !isError && products?.data?.length === 0) {
    productContent = <DataNotFound />;
  } else if (!isLoading && !isError && products?.data?.length > 0) {
    productContent = products?.data?.map((product: TProduct) => (
      <ProductCard
        key={product._id}
        product={product}
        behaviour="productCard"
      />
    ));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Vendor Info Header */}
      <VendorPublicProfile vendorId={id as string} />

      {/* all products of a vendor  */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Products{" "}
          <span className="text-gray-500 text-sm">
            ({products?.data?.length || 0})
          </span>
        </h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* all products  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productContent}
      </div>
    </div>
  );
};

export default VendorProfilePage;
