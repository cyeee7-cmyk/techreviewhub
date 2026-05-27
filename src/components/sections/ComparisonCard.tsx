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
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={comparison.image}
            alt={comparison.title}
            fill
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md z-10">
            VS
          </span>
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
            {categoryNameMap[comparison.category] || comparison.category}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
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

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {comparison.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
            Full Comparison <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
