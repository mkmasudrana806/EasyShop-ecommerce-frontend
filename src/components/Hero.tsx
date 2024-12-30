import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to EasyShop
          </h1>
          <p className="text-xl mb-6">
            Discover amazing deals on all your favorite products!
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://d3gjxtgqyywct8.cloudfront.net/o2o/image/8449e8eb-734d-4fcb-bbd0-5805dcffa3b8.jpg?height=100&width=100"
            alt="Hero Image"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
