'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setEmail('');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 dark:border-green-800 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 text-center">
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
          You&apos;re Subscribed!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You&apos;ll receive the latest reviews &amp; deals in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
        📬 Stay Updated
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Get the latest reviews &amp; deals delivered to your inbox.
      </p>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</p>
      )}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
            placeholder="you@example.com"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-1"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
}
