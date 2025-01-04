"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoadAllVendorsQuery } from "@/redux/features/vendors/vendorApi";
import { TVendor } from "@/types/vendorType";
import VendorCard from "@/components/vendor/VendorCard";
import DataNotFound from "@/components/message/DataNotFound";
import Loading from "@/components/message/Loading";
import ErrorComponent from "@/components/message/ErrorComponent";

const VendorsLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;
  // ------------ redux ----------------
  const query = {
    searchTerm: searchTerm,
    sort: "",
    limit: currentPage,
    page: currentPage,
    fields: "_id,shopName,avgRating,logo,productCount",
  };
  const { data, isLoading, isError } = useLoadAllVendorsQuery(query);

  // ------------ react ----------------
  const filteredVendors = data?.data?.result?.filter((vendor: TVendor) =>
    vendor.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors?.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // content to render
  let content = null;
  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && data.data?.result === 0) {
    return <DataNotFound />;
  } else if (!isLoading && isError) {
    return <ErrorComponent />;
  } else if (!isLoading && !isError && data.data?.result) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentVendors.map((vendor: TVendor) => (
          <VendorCard key={vendor._id} vendor={vendor} />
        ))}
      </div>
    );
  }
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-8">Our Vendors</h1>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* content for vendors  */}
      {content}

      {/* pagination  */}
      {filteredVendors.length > vendorsPerPage && (
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(filteredVendors.length / vendorsPerPage) },
            (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => paginate(i + 1)}
                className="mx-1"
              >
                {i + 1}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default VendorsLists;
