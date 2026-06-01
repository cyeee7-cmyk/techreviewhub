import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Comparison } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

export default function ComparisonCard({
  comparison,
}: {
  comparison: Comparison;
}) {
  return (
    <Link href={`/comparisons/${comparison.slug}`}>
      <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={comparison.image}
            alt={comparison.title}
            fill
          />
          <span className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700 px-4 py-1 text-sm font-bold tracking-[0.16em] text-white">
            VS
          </span>
          <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white dark:bg-amber-700">
            {categoryNameMap[comparison.category] || comparison.category}
          </span>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="wp-title line-clamp-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {comparison.title}
          </h3>

          <div className="flex items-center gap-4">
            {comparison.products.map((product, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {product.name}
                </span>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="line-clamp-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
            {comparison.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition-all hover:gap-2 dark:text-amber-300">
            Full Comparison <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
