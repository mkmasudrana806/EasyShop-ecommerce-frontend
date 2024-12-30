import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { TVendor } from "@/types/vendorType";

const VendorCard = ({ vendor }: { vendor: TVendor }) => {
  return (
    <Card key={vendor._id}>
      <CardContent className="p-4">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
            <Image
              src={vendor.logo}
              alt={`${vendor.shopName} logo`}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">
          {vendor.shopName}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{vendor.productCount} products</Badge>
          <span className="text-yellow-500">
            ★ {vendor.avgRating.toFixed(1)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/vendors/${vendor._id}`}>Visit Store</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;
