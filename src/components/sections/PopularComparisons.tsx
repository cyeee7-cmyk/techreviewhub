import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Comparison } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

interface PopularComparisonsProps {
  comparisons: Comparison[];
}

export default function PopularComparisons({ comparisons }: PopularComparisonsProps) {
  return (
    <div className="wp-widget overflow-hidden rounded-[26px]">
      <div className="border-b border-stone-200 px-5 pb-4 pt-5 dark:border-gray-700">
        <p className="wp-section-title">Comparison Archive</p>
        <h2 className="wp-title mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Popular Comparisons
        </h2>
      </div>
      <ul>
        {comparisons.map((comparison, index) => (
          <li key={comparison.slug}>
            <Link
              href={`/comparisons/${comparison.slug}`}
              className="group flex items-center gap-3 px-5 py-4 hover:bg-stone-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {comparison.products[0]?.name} vs {comparison.products[1]?.name}
                </p>
                <span className="mt-1 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
                  {categoryNameMap[comparison.category] || comparison.category}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300" />
            </Link>
            {index < comparisons.length - 1 && (
              <div className="mx-5 border-b border-stone-200 dark:border-gray-700" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
