"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TReview } from "@/types/reviewType";
import {
  useCreateReviewMutation,
  useGetReviewsOfProductQuery,
} from "@/redux/features/reviews/reviewsApi";
import { ErrorResponse } from "@/types/ErrorResponse";
import ErrorAlert from "./message/ErrorAlert";

interface ReviewSystemProps {
  productId: string;
}

export function ReviewSystem({ productId }: ReviewSystemProps) {
  // ----------------- redux --------------------
  const { data: reviews } = useGetReviewsOfProductQuery(productId, {
    skip: !productId,
  });

  const [createReview] = useCreateReviewMutation();

  // ----------------- react --------------------
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [error, setError] = useState<string[]>([]);

  // ---------------- handle submit review --------------------
  const handleSubmitReview = async () => {
    try {
      const result = await createReview(newReview).unwrap();
      console.log(result);
    } catch (err) {
      console.log(err);
      (err as ErrorResponse).data.errorSources.forEach((err) => {
        setError((prevErrors) => [...prevErrors, err.message]);
      });
    }
  };

  const averageRating =
    reviews?.data?.reduce(
      (sum: number, review: TReview) => sum + review.rating,
      0
    ) / reviews?.data?.length;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= averageRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="ml-2">{averageRating?.toFixed(1)} out of 5</span>
      </div>

      {/* reviews containers  */}
      <div className="space-y-4 mb-8">
        {reviews?.data?.map((review: TReview) => (
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
        ))}
      </div>

      {/* review form  */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              onClick={() => setNewReview({ ...newReview, rating: star })}
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= newReview.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="mb-2"
        />
        <Button
          className="mb-2"
          onClick={handleSubmitReview}
          disabled={newReview.rating === 0 || newReview.comment.trim() === ""}
        >
          Submit Review
        </Button>
      </div>
      {/* error show  */}
      {error.length > 0 && <ErrorAlert error={error} />}
    </div>
  );
}
