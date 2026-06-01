import Link from 'next/link';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BuyingGuide } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

export default function GuideCard({ guide }: { guide: BuyingGuide }) {
  return (
    <Link href={`/best/${guide.category}`}>
      <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={guide.image}
            alt={guide.title}
            fill
          />
          <span className="absolute top-3 left-3 z-10 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Buying Guide
          </span>
          <span className="absolute top-3 left-34 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white dark:bg-amber-700">
            {categoryNameMap[guide.category] || guide.category}
          </span>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="wp-title line-clamp-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {guide.title}
          </h3>

          <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {guide.productCount} products reviewed
            </span>
            {guide.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.readingTime} min
              </span>
            )}
          </div>

          <p className="line-clamp-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
            {guide.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition-all hover:gap-2 dark:text-amber-300">
            See All Picks <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
