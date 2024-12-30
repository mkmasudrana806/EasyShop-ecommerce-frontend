'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useComparison } from '../contexts/ComparisonContext'
import { useWishlist } from '../contexts/WishlistContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BarChart2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface ProductRecommendationsProps {
  currentProductId: number
  currentProductCategory: string
}

export function ProductRecommendations({ currentProductId, currentProductCategory }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const { addToComparison, isInComparison, removeFromComparison } = useComparison()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    // In a real application, this would be an API call to get recommendations
    // For this example, we'll use dummy data
    const dummyRecommendations: Product[] = [
      { id: 101, name: "Wireless Headphones", price: 129.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
      { id: 102, name: "Bluetooth Speaker", price: 79.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
      { id: 103, name: "Smartwatch", price: 199.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
      { id: 104, name: "Portable Charger", price: 49.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
    ]

    setRecommendations(dummyRecommendations.filter(product => product.id !== currentProductId))
  }, [currentProductId])

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleCompareToggle = (product: Product) => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id)
    } else {
      addToComparison(product)
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <Badge variant="secondary" className="mt-2">{product.category}</Badge>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`/products/${product.id}`}>View Product</Link>
              </Button>
              <Button
                variant={isInComparison(product.id) ? "secondary" : "outline"}
                className="w-full"
                onClick={() => handleCompareToggle(product)}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                {isInComparison(product.id) ? 'Remove from Compare' : 'Add to Compare'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

