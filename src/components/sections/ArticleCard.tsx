'use client';

import Link from 'next/link';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Review } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

export default function ArticleCard({ review }: { review: Review }) {
  return (
    <Link href={`/reviews/${review.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={review.image}
            alt={review.title}
            className="object-cover hover:scale-105 transition duration-300"
            fill
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
            {categoryNameMap[review.category] || review.category}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold line-clamp-2 text-gray-900 dark:text-gray-100">
            {review.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{review.author}</span>
            <span>·</span>
            <span>{review.date}</span>
            {review.readingTime && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {review.readingTime} min
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(review.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              {review.rating}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {review.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
            Read Review <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
