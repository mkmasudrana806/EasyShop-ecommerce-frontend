"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { TProduct } from "@/types/productType";

interface QuickViewProps {
  product: TProduct;
}

export function QuickView({ product }: QuickViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Quick View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Quick product overview</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
              className="col-span-4 w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Badge variant="secondary" className="col-span-4">
              {product.category}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Price:</span>
            <span className="col-span-3">${product.price.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Rating:</span>
            <div className="col-span-3 flex items-center">
              {[...Array(5)].map((_, i = 4) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <span className="font-bold">Description:</span>
            <p className="col-span-3">{product.description}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button asChild>
            <Link href={`/products/${product._id}`}>View Full Details</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
