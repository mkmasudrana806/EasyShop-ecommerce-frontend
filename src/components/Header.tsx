"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  Search,
  Clock,
  BarChart2,
  Zap,
  Heart,
  User,
} from "lucide-react";

import { Cart } from "./Cart";
import { useComparison } from "./contexts/ComparisonContext";
import { useWishlist } from "./contexts/WishlistContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { comparedProducts } = useComparison();
  const { wishlist } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto  py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EasyShop
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4 relative"
        >
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full bg-background text-foreground pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>

        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/flash-sale"
            className="text-gray-600 hover:text-blue-600"
          >
            <Zap className="h-4 w-4 inline-block mr-1" />
            Flash Sale
          </Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">
            <BarChart2 className="h-4 w-4 inline-block mr-1" />
            Compare ({comparedProducts.length})
          </Link>
          <Link href="/wishlist" className="text-gray-600 hover:text-blue-600">
            <Heart className="h-4 w-4 inline-block mr-1" />
            Wishlist ({wishlist.length})
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
            <User className="h-4 w-4 inline-block mr-1" />
            Dashboard
          </Link>
          <Cart />
        </nav>

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link
              href="/products"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Categories
            </Link>
            <Link
              href="/vendors"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Vendors
            </Link>
            <Link
              href="/flash-sale"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              <Zap className="h-4 w-4 inline-block mr-1" />
              Flash Sale
            </Link>
            <Link
              href="/recent-products"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              <Clock className="h-4 w-4 inline-block mr-1" />
              Recent Products
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              <BarChart2 className="h-4 w-4 inline-block mr-1" />
              Compare ({comparedProducts.length})
            </Link>
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              <Heart className="h-4 w-4 inline-block mr-1" />
              Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              <User className="h-4 w-4 inline-block mr-1" />
              Dashboard
            </Link>
            <Cart />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
