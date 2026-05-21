import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Comparison } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

interface PopularComparisonsProps {
  comparisons: Comparison[];
}

export default function PopularComparisons({ comparisons }: PopularComparisonsProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white px-5 pt-5 pb-3">
        ⚖️ Popular Comparisons
      </h2>
      <ul>
        {comparisons.map((comparison, index) => (
          <li key={comparison.slug}>
            <Link
              href={`/comparisons/${comparison.slug}`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {comparison.products[0]?.name} vs {comparison.products[1]?.name}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  {categoryNameMap[comparison.category] || comparison.category}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </Link>
            {index < comparisons.length - 1 && (
              <div className="border-b border-gray-100 dark:border-gray-700 mx-5" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
