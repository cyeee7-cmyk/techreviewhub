'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <div className="wp-widget rounded-[26px] p-5">
      <p className="wp-section-title mb-4">Search Archive</p>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reviews, comparisons..."
          className="w-full rounded-full border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>
    </div>
  );
}
