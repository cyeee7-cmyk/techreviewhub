import Link from 'next/link';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BuyingGuide } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';

export default function GuideCard({ guide }: { guide: BuyingGuide }) {
  return (
    <Link href={`/best/${guide.category}`}>
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={guide.image}
            alt={guide.title}
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            Buying Guide
          </span>
          <span className="absolute top-3 left-32 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {categoryNameMap[guide.category] || guide.category}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
            {guide.title}
          </h3>

          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
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

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {guide.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
            See All Picks <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
