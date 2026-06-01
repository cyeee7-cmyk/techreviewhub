'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');

  return (
    <div className="wp-widget rounded-[26px] p-6">
      <p className="wp-section-title mb-3">Newsletter Widget</p>
      <h2 className="wp-title mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Stay Updated
      </h2>
      <p className="mb-5 text-sm leading-7 text-stone-600 dark:text-gray-400">
        Get the latest reviews &amp; deals delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-full border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <button className="rounded-full bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-stone-500 dark:text-gray-500">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
}
