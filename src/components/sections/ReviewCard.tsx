'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Review } from '@/lib/types';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={`/reviews/${review.slug}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
            <ImageWithFallback
              src={review.image}
              alt={review.title}
              className="object-cover transition-transform hover:scale-105"
              fill
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                {review.category}
              </span>
              <span>{review.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {review.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
              {review.excerpt}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {review.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              By {review.author}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
