import { Star } from "lucide-react";
import React from "react";

const Rating = ({ rate }: { rate: number }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rate)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </>
  );
};

export default Rating;
