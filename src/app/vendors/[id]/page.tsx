"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// This would typically come from an API or database
const vendors = {
  "1": {
    id: 1,
    name: "TechGadgets",
    logo: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
  },
  // ... other vendors
};

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Laptop",
    price: 999.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 699.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Tablet",
    price: 349.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  // Add more products as needed
];

export default function VendorStorePage() {
  const { id } = useParams();
  const vendor = vendors[id as keyof typeof vendors];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center mb-8">
        <Image
          src={vendor.logo}
          alt={`${vendor.name} logo`}
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-2">
              ★ {vendor.rating.toFixed(1)}
            </span>
            <Badge variant="secondary">{products.length} products</Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
