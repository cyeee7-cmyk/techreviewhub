'use client';

import { useState } from 'react';
import { deals, categoryNameMap } from '@/lib/data';
import { Deal } from '@/lib/types';
import DealCard from '@/components/sections/DealCard';
import { Flame, Tag, Clock, SlidersHorizontal } from 'lucide-react';

const allCategories = ['all', ...Object.keys(categoryNameMap)];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'expiring', label: 'Expiring Soon' },
];

function sortDeals(dealsList: Deal[], sortBy: string): Deal[] {
  const sorted = [...dealsList];
  switch (sortBy) {
    case 'discount':
      return sorted.sort((a, b) => b.discount - a.discount);
    case 'price-low':
      return sorted.sort((a, b) => parseFloat(b.dealPrice.replace(/[^0-9.]/g, '')) - parseFloat(a.dealPrice.replace(/[^0-9.]/g, '')));
    case 'price-high':
      return sorted.sort((a, b) => parseFloat(a.dealPrice.replace(/[^0-9.]/g, '')) - parseFloat(b.dealPrice.replace(/[^0-9.]/g, '')));
    case 'expiring':
      return sorted.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
    default:
      return sorted;
  }
}

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showHotOnly, setShowHotOnly] = useState(false);
  const [showCouponOnly, setShowCouponOnly] = useState(false);

  let filtered = deals;

  if (activeCategory !== 'all') {
    filtered = filtered.filter((d) => d.category === activeCategory);
  }
  if (showHotOnly) {
    filtered = filtered.filter((d) => d.isHot);
  }
  if (showCouponOnly) {
    filtered = filtered.filter((d) => d.couponCode);
  }

  filtered = sortDeals(filtered, sortBy);

  const featuredDeals = deals.filter((d) => d.isFeatured);
  const hotCount = deals.filter((d) => d.isHot).length;
  const couponCount = deals.filter((d) => d.couponCode).length;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            🔥 Today&apos;s Best Deals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Hand-picked deals updated daily. Save big on AI gadgets, creator tools, mini PCs, and more.
          </p>
        </div>

        {featuredDeals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Flame className="h-6 w-6 text-orange-500" />
              Featured Deals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900 dark:text-white">Filter Deals</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {cat === 'all' ? 'All Categories' : categoryNameMap[cat] || cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHotOnly(!showHotOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  showHotOnly
                    ? 'bg-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Hot Deals ({hotCount})
              </button>

              <button
                onClick={() => setShowCouponOnly(!showCouponOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  showCouponOnly
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                Has Coupon ({couponCount})
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filtered.length} deal{filtered.length !== 1 ? 's' : ''}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No deals found matching your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setShowHotOnly(false);
                setShowCouponOnly(false);
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Get exclusive deals and coupon codes delivered straight to your inbox. Our subscribers save an average of $200/month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors">
              Get Deals
            </button>
          </div>
          <p className="text-sm text-green-200 mt-4">Join 30,000+ savvy shoppers. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
