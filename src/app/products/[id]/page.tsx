"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, ShoppingCart } from "lucide-react";
import { useGetProductByIdQuery } from "@/redux/features/products/productApi";
import Loading from "@/components/message/Loading";
import { useRecentlyViewed } from "@/components/contexts/RecentlyViewedContext";
import { SizeGuide } from "@/components/SizeGuide";
import { CouponSystem } from "@/components/CouponSystem";
import { ReviewSystem } from "@/components/ReviewSystem";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { RecentlyViewedProducts } from "@/components/product/RecentlyViewedProducts";

// Dummy product data (in a real app, this would come from an API)
const product = {
  id: 1,
  name: "Classic Cotton T-Shirt",
  price: 29.99,
  description:
    "A comfortable and stylish cotton t-shirt, perfect for everyday wear.",
  category: "Clothing",
 
  rating: 4.5,
  reviews: 120,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
 
  vendor: {
    name: "FashionHub",
    id: 1,
  },
};

// Dummy review data (in a real app, this would come from an API)
const initialReviews = [
  {
    id: 1,
    userId: "user1",
    username: "Alice Johnson",
    rating: 5,
    comment:
      "Great t-shirt! The fabric is soft and comfortable, and the fit is perfect.",
    date: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    userId: "user2",
    username: "Bob Smith",
    rating: 4,
    comment:
      "Good quality shirt. The color is exactly as shown in the picture.",
    date: "2023-05-10T14:45:00Z",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  // ------------------- redux ----------------
  const { data: product, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  console.log(product?.data);
  // ------------------- react ----------------
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [discountedPrice, setDiscountedPrice] = useState(product.price);
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addToRecentlyViewed({
      _id: product.id,
      name: product.name,
      price: product.price,
      images: product.images[0],
      category: product.category,
    });
  }, [addToRecentlyViewed]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }
    console.log(
      `Added ${quantity} of product ${id} (Size: ${selectedSize}, Color: ${selectedColor}) to cart at ${discountedPrice.toFixed(
        2
      )} each`
    );
    // Here you would typically update the cart state or send a request to your backend
  };

  const handleCouponApplied = (
    vendorDiscount: number,
    globalDiscount: number
  ) => {
    const totalDiscount = vendorDiscount + globalDiscount;
    const newPrice = product.price * (1 - totalDiscount / 100);
    setDiscountedPrice(newPrice);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={mainImage}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="mt-4 flex gap-2">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-2xl font-bold mb-4">
            ${discountedPrice.toFixed(2)}
            {discountedPrice < product.price && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </p>
          <p className="mb-4">{product.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="outline">{product.subCategory}</Badge>
          </div>
          <div className="space-y-4 mb-4">
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Size
              </label>
              <div className="flex items-center gap-2">
                <Select onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <SizeGuide />
              </div>
            </div>
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color
              </label>
              <Select onValueChange={setSelectedColor}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border rounded"
            />
          </div>
          <Button onClick={handleAddToCart} className="w-full mb-4">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <CouponSystem
            vendorId={product.vendor.id}
            onCouponApplied={handleCouponApplied}
          />
          <Card className="mt-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Sold by:</h3>
              <p>{product.vendor.name}</p>
              <Button variant="link" className="p-0">
                Visit Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <ReviewSystem
        productId={product.id.toString()}
        initialReviews={initialReviews}
      />
      <ProductRecommendations
        currentProductId={product.id}
        currentProductCategory={product.category}
      />
      <RecentlyViewedProducts />
    </div>
  );
}
