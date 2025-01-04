import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";
import { TReview } from "@/types/reviewType";

const ReviewCard = ({review}: {review: TReview}) => {
  return (
    <Card key={review._id}>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>{review?.user?.name}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{review?.user?.name}</span>
        </div>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= review.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {new Date(review?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p>{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
