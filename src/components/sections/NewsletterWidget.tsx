'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
        📬 Stay Updated
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
}
