import Link from 'next/link';
import { Eye } from 'lucide-react';
import { TrendingItem } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

interface TrendingSidebarProps {
  items: TrendingItem[];
}

export default function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white px-5 pt-5 pb-3">
        🔥 Trending Now
      </h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.slug}>
            <Link
              href={`/reviews/${item.slug}`}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    {categoryNameMap[item.category] || item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="h-3 w-3" />
                    {item.views}
                  </span>
                </div>
              </div>
            </Link>
            {index < items.length - 1 && (
              <div className="border-b border-gray-100 dark:border-gray-700 mx-5" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
