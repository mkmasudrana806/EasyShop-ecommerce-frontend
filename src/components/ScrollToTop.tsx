"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import from your shadcn setup
import { ArrowUp } from "lucide-react"; // Optional: Replace with any icon you prefer

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Button
        onClick={handleScrollToTop}
        variant="outline"
        className="fixed border-blue-500 outline-blue-500  bottom-5 h-[40px] w-[40px] right-5 z-50 p-2 rounded-full shadow-lg bg-gray-100 hover:bg-blue-100"
      >
        <ArrowUp color="blue" className="h-5 w-5  " />
      </Button>
    )
  );
};

export default ScrollToTop;
