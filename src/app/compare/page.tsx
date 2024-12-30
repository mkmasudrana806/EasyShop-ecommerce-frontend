"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useComparison } from "@/components/contexts/ComparisonContext";

export default function ComparePage() {
  const { comparedProducts, clearComparison } = useComparison();

  if (comparedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Comparison</h1>
        <p className="mb-4">You have not added any products to compare yet.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Comparison</h1>
      <div className="mb-4 flex justify-between items-center">
        <p>{comparedProducts.length} product(s) being compared</p>
        <Button variant="outline" onClick={clearComparison}>
          Clear All
        </Button>
      </div>

      {/* show comparison results as table  */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            {comparedProducts.map((product) => (
              <TableHead key={product._id}>{product.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Price</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>
                ${product.price.toFixed(2)}
              </TableCell>
            ))}
          </TableRow>
          {/* flashSale  */}
          <TableRow>
            <TableCell className="font-medium">Flash Sale</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>
                {product.flashSale ? "Yes" : "No"}
              </TableCell>
            ))}
          </TableRow>

          {/* flashSalePrice  */}
          <TableRow>
            <TableCell className="font-medium">Flash Sale Price</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>
                {product.flashSale
                  ? `$${product?.flashSalePrice?.toFixed(2)}`
                  : "-"}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Category</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>{product.category}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Category</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>{product.category}</TableCell>
            ))}
          </TableRow>

          {/* view full details  */}
          <TableRow>
            <TableCell className="font-medium">Full Details</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>
                <Link
                  className="underline text-blue-600"
                  href={`/products/${product._id}`}
                >
                  View
                </Link>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Description</TableCell>
            {comparedProducts.map((product) => (
              <TableCell key={product._id}>{product.description}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
