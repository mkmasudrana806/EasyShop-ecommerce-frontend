import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

const Testimonial = ({testimonial}: {testimonial: any}) => {
    return (
        <Card key={testimonial.id}>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="mb-4">{testimonial.comment}</p>
          <p className="font-semibold">- {testimonial.name}</p>
        </CardContent>
      </Card>
    );
};

export default Testimonial;