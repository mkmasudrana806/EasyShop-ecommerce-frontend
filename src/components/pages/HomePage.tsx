import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/constant";
import { RecentlyViewedProducts } from "../product/RecentlyViewedProducts";
import { TProduct } from "@/types/productType";
import ProductCard from "../product/FeaturedProductCard";
import Hero from "../Hero";
import { TCategory } from "@/types/categoryType";
import FlashSaleCard from "../product/FlashSaleCard";
import Testimonial from "../Testimonial";

/**
 *
 * Home page shows a list of products, featured categories, flash sale items, testimonials, recently viewed products, and a newsletter signup form.
 */
const HomePage = async () => {
  // fetching the products data
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "force-cache",
  });
  const products = await res.json();

  // fetching the categories data
  const resCategories = await fetch(
    "http://localhost:5000/api/categories/public",
    {
      cache: "force-cache",
    }
  );
  const categories = await resCategories.json();

  return (
    <div className="container mx-auto py-4">
      {/* Hero Section */}
      <Hero />

      {/* Flash Sale Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Flash Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.data?.length > 0 ? (
            products.data?.map(
              (product: TProduct) =>
                product.flashSale && (
                  <FlashSaleCard key={product._id} product={product} />
                )
            )
          ) : (
            <h1>Flash sale product not available!</h1>
          )}
        </div>
        <div className="text-center mt-6">
          <Button asChild>
            <Link href="/flash-sale">View All Flash Sale Items</Link>
          </Button>
        </div>
      </section>

      {/*  Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.data?.length > 0 ? (
            categories.data.map((category: TCategory) => (
              <Link
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(" & ", "-")}`}
                key={category._id}
                className="text-center"
              >
                {/* Container for the image */}
                <div className="bg-gray-100 rounded-full p-2 mb-2 transition-transform hover:scale-105 aspect-square flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Category name */}
                <p className="text-xl font-medium hover:text-blue-600">
                  {category.name}
                </p>
              </Link>
            ))
          ) : (
            <h1>Categories not Found!</h1>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data?.length > 0 ? (
            products.data?.map(
              (product: TProduct) =>
                product.featured && (
                  <ProductCard key={product._id} product={product} />
                )
            )
          ) : (
            <h1>No Products found!</h1>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12 bg-gray-100 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      <RecentlyViewedProducts />

      {/* Newsletter Signup Section */}
      <section className="mb-12 bg-blue-600 text-white py-12 px-4 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter for exclusive deals and updates!
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
