import Link from "next/link";

import { categories, trendingItems } from "@/lib/data";

interface BlogPageSidebarProps {
  eyebrow: string;
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}

export default function BlogPageSidebar({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: BlogPageSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="wp-widget rounded-[26px] p-6">
        <span className="wp-section-title">{eyebrow}</span>
        <h3 className="wp-title mt-3 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
          {description}
        </p>
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          {actionLabel}
        </Link>
      </div>

      <div className="wp-widget rounded-[26px] p-6">
        <span className="wp-section-title">Topic Archive</span>
        <div className="mt-4 space-y-3">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-gray-800 hover:border-amber-700 hover:text-amber-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-amber-400 dark:hover:text-amber-300"
            >
              <span>{category.name}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-gray-500">
                {category.articleCount}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="wp-widget rounded-[26px] p-6">
        <span className="wp-section-title">Popular Reads</span>
        <ul className="mt-4 space-y-4">
          {trendingItems.slice(0, 4).map((item, index) => (
            <li key={item.slug} className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white dark:bg-amber-700">
                {index + 1}
              </span>
              <div>
                <Link
                  href={`/reviews/${item.slug}`}
                  className="font-semibold text-gray-900 hover:text-amber-700 dark:text-white dark:hover:text-amber-300"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
                  {item.views} views
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
