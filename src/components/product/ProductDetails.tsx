"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../message/Loading";
import { TProduct } from "@/types/productType";
import Link from "next/link";
import Rating from "../Rating";
import { useGetReviewsOfProductQuery } from "@/redux/features/reviews/reviewsApi";
import { TReview } from "@/types/reviewType";
import { useAddToCart } from "@/utils/useAddToCart";
import VendorMismatchModal from "../VendorMismatchModal";

const ProductDetails = ({
  product,
  isLoading,
}: {
  product: TProduct;
  isLoading: boolean;
}) => {
  // ----------------- redux --------------------
  const { data: reviews } = useGetReviewsOfProductQuery(product?._id, {
    skip: !product?._id,
  });

  const totalRatings = reviews?.data?.reduce(
    (total: number, review: TReview) => total + review.rating,
    0
  );
  const avgRating = totalRatings / reviews?.data?.length;

  // ------------------- react ----------------
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const { handleAddToCart, isModalOpen, handleModalChoice, setIsModalOpen } =
    useAddToCart();

  // initial load discountPrice and mainImage
  useEffect(() => {
    setDiscountedPrice(product?.flashSalePrice);
    setMainImage(product?.images[0]);
  }, [product]);

 
  if (isLoading) {
    return <Loading />;
  }

 
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* images  */}
      <div>
        <Image
          src={mainImage}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="mt-4 flex gap-2">
          {product.images?.map((img: string, index: number) => (
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

      {/* product details  */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <Rating rate={avgRating || 0} />
          <span className="ml-2 text-sm text-gray-600">
            ({reviews?.data?.length || 0} reviews)
          </span>
        </div>

        {/* discount label  */}
        {product?.flashSale && (
          <div className="flex items-center gap-2 text-green-600  ">
            <Gift size={20} className="text-green-600" />
            {product.discount}% discount added!
          </div>
        )}

        {/* product price  */}
        {product?.flashSale ? (
          <p className="text-2xl font-bold mb-2 mt-1">
            ${discountedPrice?.toFixed(2)}
            {discountedPrice < product.price && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </p>
        ) : (
          <p className="text-2xl font-bold mb-2">
            ${product.price?.toFixed(2)}
          </p>
        )}

        {/* product description  */}
        <p className="mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{product.category}</Badge>
        </div>

        {/* cart quantity  */}
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              handleAddToCart(product, Number(e.target.value));
            }}
            className="w-16 p-2 border rounded"
          />
        </div>

        <Button
          onClick={() => handleAddToCart(product, quantity)}
          className="w-full my-4"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>

        {/* vendor details  */}
        <Link
          href={`/vendors/${product?.vendor._id}`}
          className="block bg-white border rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-2">
            {product?.vendor.logo && (
              <Image
                src={product?.vendor.logo}
                alt={`${product?.vendor.shopName} logo`}
                width={60}
                height={60}
                className="rounded-full shadow-md"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                {product?.vendor.shopName}
                <div className="flex items-center gap-1">
                  <Rating rate={2} />
                </div>
              </h3>
              <p className="text-sm text-gray-600  ">
                {product?.vendor?.productCount} products
              </p>
            </div>
          </div>
        </Link>
      </div>

      <VendorMismatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalChoice}
      />
    </div>
  );
};

export default ProductDetails;
