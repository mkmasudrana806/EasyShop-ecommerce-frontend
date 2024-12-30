import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { QuickLinks } from "./QuickLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About EasyShop</h3>
            <p className="text-sm">
              EasyShop is your one-stop e-commerce solution, connecting
              customers with a wide range of products from various vendors.
            </p>
          </div>
          <QuickLinks />
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/electronics"
                  className="hover:text-blue-600"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="hover:text-blue-600">
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/category/home-garden"
                  className="hover:text-blue-600"
                >
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/category/toys" className="hover:text-blue-600">
                  Toys & Games
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="hover:text-blue-600">
                  Beauty & Personal Care
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-blue-600">
                  Sports & Outdoors
                </Link>
              </li>
              <li>
                <Link href="/category/books" className="hover:text-blue-600">
                  Books & Media
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center hover:text-blue-600">
                  <Facebook className="w-5 h-5 mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-blue-600">
                  <Twitter className="w-5 h-5 mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-blue-600">
                  <Instagram className="w-5 h-5 mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-blue-600">
                  <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>
            &copy; {new Date().getFullYear()} EasyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
