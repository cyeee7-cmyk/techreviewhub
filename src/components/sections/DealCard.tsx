'use client';

import { Deal } from '@/lib/types';
import { categoryNameMap } from '@/lib/data';
import { Clock, Copy, ExternalLink, Flame, Tag, Check } from 'lucide-react';
import { useState } from 'react';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

export default function DealCard({ deal }: { deal: Deal }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(deal.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={deal.image}
            alt={deal.title}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            -{deal.discount}%
          </span>
          {deal.isHot && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Flame className="w-3 h-3" /> HOT
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {categoryNameMap[deal.category] || deal.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
          {deal.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {deal.description}
        </p>

        <div className="flex items-end gap-3 mb-4">
          <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
            {deal.dealPrice}
          </span>
          <span className="text-base text-gray-400 line-through mb-0.5">
            {deal.originalPrice}
          </span>
          <span className="text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded mb-0.5">
            Save {deal.discount}%
          </span>
        </div>

        {deal.couponCode && (
          <div className="mb-4 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-3 bg-blue-50 dark:bg-blue-950/50">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Coupon Code</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="font-mono tracking-wider">{deal.couponCode}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">{deal.store}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
          </span>
        </div>

        <a
          href={deal.affiliateLink}
          rel="sponsored"
          className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-sm"
        >
          Get This Deal
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
