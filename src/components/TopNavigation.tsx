"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Package, Grid, Users, Clock } from "lucide-react";

const navItems = [
  { name: "Recent", href: "/recent-products", icon: Clock },
  { name: "Products", href: "/products", icon: Package },
  { name: "Categories", href: "/categories", icon: Grid },
  { name: "Vendors", href: "/vendors", icon: Users },
];

export function TopNavigation() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <div className="mt-3 container mx-auto">
      <ScrollArea className="w-full whitespace-nowrap">
        <Tabs value={activeTab} className="w-max">
          <TabsList>
            {navItems.map((item) => (
              <TabsTrigger key={item.href} value={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex items-center hover:text-blue-600 space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
