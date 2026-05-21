import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { Review } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

export default function FeaturedCard({
  review,
  size,
}: {
  review: Review;
  size: 'large' | 'small';
}) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div
        className={`relative ${
          size === 'large' ? 'aspect-[16/9]' : 'aspect-[16/10]'
        } overflow-hidden`}
      >
        <img
          src={review.image}
          alt={review.title}
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          {categoryNameMap[review.category] || review.category}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
          <h3
            className={`font-bold text-white line-clamp-2 ${
              size === 'large' ? 'text-3xl' : 'text-xl'
            }`}
          >
            {review.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-white/80">
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
                    : 'text-white/30'
                }`}
              />
            ))}
            <span className="text-sm font-medium text-white/90 ml-1">
              {review.rating}
            </span>
          </div>

          {size === 'large' && (
            <p className="text-sm text-white/70 line-clamp-2">
              {review.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
