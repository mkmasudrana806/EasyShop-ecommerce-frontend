"use client";

import { TProduct } from "@/types/productType";
import React, { createContext, useContext, useState, useEffect } from "react";

type ComparisonContextType = {
  comparedProducts: TProduct[];
  addToComparison: (product: TProduct) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
};

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comparedProducts, setComparedProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("comparedProducts");
    if (storedProducts) {
      setComparedProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comparedProducts", JSON.stringify(comparedProducts));
  }, [comparedProducts]);

  const addToComparison = (product: TProduct) => {
    if (
      comparedProducts.length < 4 &&
      !comparedProducts.some((p) => p._id === product._id)
    ) {
      setComparedProducts((prev) => [...prev, product]);
    } else if (comparedProducts.length >= 4) {
      alert("You can only compare up to 4 products at a time.");
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const clearComparison = () => {
    setComparedProducts([]);
  };

  const isInComparison = (productId: string) => {
    return comparedProducts.some((p) => p._id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
