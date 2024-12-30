import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TCategory } from "@/types/categoryType";
import NotFound from "../not-found";

export default async function CategoriesPage() {
  // fetching the categories data
  const res = await fetch("http://localhost:5000/api/categories/public", {
    cache: "force-cache",
  });

  const categories = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.data?.length > 0 ? (
          categories.data?.map((category: TCategory) => (
            <Link href={`/category/${category._id}`} key={category._id}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h2 className="text-xl font-semibold mt-4">
                    {category.name}
                  </h2>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  {category.productCount || 0} products
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}
