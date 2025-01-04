import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";

import Providers from "@/lib/Providers";
import Header from "@/components/Header";
import { ComparisonProvider } from "@/components/contexts/ComparisonContext";
import { WishlistProvider } from "@/components/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/components/contexts/RecentlyViewedContext";
import { TopNavigation } from "@/components/TopNavigation";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Easy Shop",
  description:
    "Easy shop is an ecommerce application that provides online products purchase for users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Toaster />
          <ComparisonProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <div
                  className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col  min-h-screen`}
                >
                  <ScrollToTop />
                  <Header />
                  <TopNavigation />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </ComparisonProvider>
        </body>
      </html>
    </Providers>
  );
}
