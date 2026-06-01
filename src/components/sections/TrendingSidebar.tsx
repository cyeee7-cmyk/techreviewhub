import Link from 'next/link';
import { Eye } from 'lucide-react';
import { TrendingItem } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

interface TrendingSidebarProps {
  items: TrendingItem[];
}

export default function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="wp-widget overflow-hidden rounded-[26px]">
      <div className="border-b border-stone-200 px-5 pb-4 pt-5 dark:border-gray-700">
        <p className="wp-section-title">Reader Favorites</p>
        <h2 className="wp-title mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.slug}>
            <Link
              href={`/reviews/${item.slug}`}
              className="flex items-start gap-3 px-5 py-4 hover:bg-stone-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
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
              <div className="mx-5 border-b border-stone-200 dark:border-gray-700" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
