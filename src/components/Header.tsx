"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserProfileMenu from "./UserProfileMenu";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TooltipShow from "./TooltipShow";

const Header = () => {
  // ---------------- redux --------------------
  const currentLoggedInUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
 

  // ---------------- react --------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { comparedProducts } = useComparison();
  const { wishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // handle search product
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // handle logout user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto  py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EasyShop
        </Link>

        {/* search products  */}
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

        {/* nav items  */}
        <nav className="hidden md:flex items-center space-x-4">
          {/* flash sale  */}
          <Link
            href="/flash-sale"
            className={` ${
              pathname === "/flash-sale" ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-600`}
          >
            <Zap className="h-4 w-4 inline-block mr-1" />
            Flash Sale
          </Link>

          {/* compare  */}
          <TooltipShow content="Compare product">
            <Link
              href="/compare"
              className={` ${
                pathname === "/compare" ? "text-blue-600" : "text-gray-600"
              } hover:text-blue-600`}
            >
              <BarChart2 className="h-4 w-4 inline-block mr-1" />(
              {comparedProducts.length})
            </Link>
          </TooltipShow>

          {/* wishlist  */}
          <TooltipShow content="Your wishlist">
            <Link
              href="/wishlist"
              className={`hover:text-blue-600 ${
                pathname === "/wishlist"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              <Heart className="h-4 w-4 inline-block mr-1" />({wishlist.length})
            </Link>
          </TooltipShow>
          <Cart />
          {/* open menu when user is logged in  */}
          {currentLoggedInUser ? (
            <>
              <Button onClick={handleLogout} className="mx-2">
                Log out
              </Button>

              {/* user profile menu  */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={
                        currentLoggedInUser?.profilePicture
                          ? currentLoggedInUser?.profilePicture
                          : "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="max-w-fit p-4">
                  <UserProfileMenu />
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <div className="flex items-center ml-2 space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* humbargar menu  */}
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

      {/* show in small devices  */}
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
            <Button onClick={handleLogout} className="mx-2">
              Log out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
