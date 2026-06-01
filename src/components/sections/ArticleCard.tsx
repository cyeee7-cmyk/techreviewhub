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
        className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={review.image}
            alt={review.title}
            className="hover:scale-105 transition duration-300"
            fill
          />
          <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white dark:bg-amber-700">
            {categoryNameMap[review.category] || review.category}
          </span>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="wp-title line-clamp-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {review.title}
          </h3>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-gray-400">
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

          <p className="line-clamp-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
            {review.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition-all hover:gap-2 dark:text-amber-300">
            Read Review <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
