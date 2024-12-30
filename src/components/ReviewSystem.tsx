'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: number
  userId: string
  username: string
  rating: number
  comment: string
  date: string
}

interface ReviewSystemProps {
  productId: string
  initialReviews: Review[]
}

export function ReviewSystem({ productId, initialReviews }: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }))
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(prev => ({ ...prev, comment: event.target.value }))
  }

  const handleSubmitReview = () => {
    // In a real application, this would be an API call to submit the review
    const newReviewObject: Review = {
      id: reviews.length + 1,
      userId: 'user123', // This would be the actual user ID in a real app
      username: 'John Doe', // This would be the actual username in a real app
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    }
    setReviews([...reviews, newReviewObject])
    setNewReview({ rating: 0, comment: '' })
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2">{averageRating.toFixed(1)} out of 5</span>
      </div>
      <div className="space-y-4 mb-8">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{review.username[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{review.username}</span>
              </div>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              onClick={() => handleRatingChange(star)}
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={handleCommentChange}
          className="mb-2"
        />
        <Button onClick={handleSubmitReview} disabled={newReview.rating === 0 || newReview.comment.trim() === ''}>
          Submit Review
        </Button>
      </div>
    </div>
  )
}

